import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { Icategories } from 'src/app/models/icategories';
import { CategoriesService } from 'src/app/Services/categories.service';
import { Icategories } from 'src/app/Models/icategories';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  allCategories: Icategories[] = []
  filteredCategories: Icategories[] = []
  imagePath: string=''
  CreatedDateAt:any;
    updatedDateAt:any;
  set listFillterCategory(value: string) {
    this.filteredCategories = this.categoryFilter(value);
    console.log(this.filteredCategories);
  }

  constructor(
    public CategoryAPI: CategoriesService,
    public addCategory: Router
  ) {}
  ngOnInit(): void {
    this.imagePath=environment.BaseApiURL
    // git all categories & fillter categories
    this.CategoryAPI.getAllCategories().subscribe({
      next: (data) => {
        this.allCategories = data;
        this.filteredCategories = this.allCategories;
        this.filteredCategories=this.filteredCategories.map((date)=>{
          this.CreatedDateAt = this.filteredCategories.find((creatdate) => creatdate.createdAt === date.createdAt);
          this.updatedDateAt = this.filteredCategories.find((updatedate) => updatedate.updatedAt === date.updatedAt);
          date.createdAt =new Date(this.CreatedDateAt.createdAt).toLocaleDateString()
          date.updatedAt =new Date(this.updatedDateAt.updatedAt).toLocaleDateString();
          return date
        })
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  // fillter category functions
  categoryFilter(fillterValue: string): Icategories[] {
    fillterValue = fillterValue.toLowerCase();
    return this.allCategories.filter((category: Icategories) =>
      category.name.toLowerCase().includes(fillterValue)
    );
  }

  // show and hide input
  showInput: boolean = false;
  showHideInputSearch() {
    this.showInput = !this.showInput;
  }

  // add new category click handler
  addNewCategory() {
    this.addCategory.navigate(['/Categories/newCategory']);
  }

  // edit category click handler
  editCategory(id: string) {
    this.addCategory.navigate([`/Categories/editCategory`, id]);
    // console.log(id);
  }

  // delete category function
  deleteCategory(id: string) {
    let _confirm = confirm('Are you sure to delete this category');
    if (_confirm) {
      this.CategoryAPI.deleteCategory(id).subscribe({
        next: (data) => {
          this.filteredCategories = this.filteredCategories.filter(
            (category) => category._id != id
          );
          console.log(data);
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }
}
