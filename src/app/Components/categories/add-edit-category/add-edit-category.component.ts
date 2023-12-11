import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Icategories } from 'src/app/Models/icategories';
import { CategoriesService } from 'src/app/Services/categories.service';

@Component({
  selector: 'app-add-edit-category',
  templateUrl: './add-edit-category.component.html',
  styleUrls: ['./add-edit-category.component.scss'],
})
export class AddEditCategoryComponent implements OnInit {
  prevImage: string = '';
  categoryForm: FormGroup
  updateId: any;
  newCategory: Icategories = {} as Icategories;
  updateCategory: Icategories= {} as Icategories;
  categoryName?: Icategories;
  category: Icategories[] = [];
  constructor(public formbiler: FormBuilder,
    public CategoryAPI: CategoriesService,
    public router: Router,
    private getIdFromUrl: ActivatedRoute
  ) {
    this.categoryForm = this.formbiler.group({
      name: [``, [Validators.required]],
      arname: [``, [Validators.required]],
      image: [``, [Validators.required]],
    })
  }
  get name() {
    return this.categoryForm.get('name')
  }
  get arname() {
    return this.categoryForm.get('arname')
  }
  get image() {
    return this.categoryForm.get('image')
  }

  ngOnInit(): void {
    this.CategoryAPI.getAllCategories().subscribe((data) => {
      this.category = data;
    });
    // update category page handler
    this.getIdFromUrl.paramMap.subscribe({
      next: (params) => {
        this.updateId = params.get('id');
        this.CategoryAPI.getCategoryById(this.updateId).subscribe({
          next: (data) => {
            this.newCategory = data;
            this.prevImage = this.newCategory.image;
          this.updateCategory.name = this.newCategory.name;
          this.updateCategory.arname = this.newCategory.arname;
            // console.log(this.updateCategory);
          },
          error: (err) => {
            console.log(err);
          },
        });
      },
    });
  }


  onImageSelected(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      this.newCategory.image = file;
    }
  }
  // add new category function
  addNewCategory(value: any) {
    this.categoryName = this.category.find((cat) => cat.name == value.name);
    if (value.name == this.categoryName?.name) {
      alert('this category is already registered');
    } else {
      this.CategoryAPI.addcategory(this.newCategory).subscribe({
        next: (data) => {
          alert('category added successfully');
          this.router.navigate(['/Categories/Categories']);
        },
        error: (err) => {
          console.log('add error');
          console.log(err);

        },
      });
    }
  }

  // update category function
  editCategory(data: any, id: any) {
    // data.name='category'
    let newCategory = {
      name: data.name,
      arname:data.arname,
      image:data.image
    };
    this.categoryName = this.category.find((cat) => cat.name == data.name);
    if (this.categoryName?.name == data.name) {
      alert('this category is already registered');
    } else {
      this.CategoryAPI.editCategory(newCategory, id).subscribe({
        next: (data) => {
          alert('category updated successfully');
          this.router.navigate(['/Categories/Categories']);
        },
        error: (err) => {
          console.log('updete error');
        },
      });
    }
  }
}
