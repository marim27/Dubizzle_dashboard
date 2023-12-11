import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SubCategoriesServicesService } from 'src/app/Services/SubCategories/sub-categories-services.service';
import { Icategories } from 'src/app/Models/icategories';
import { IsubCategories } from 'src/app/Models/isub-categories';
import { CategoriesService } from 'src/app/Services/categories.service';

@Component({
  selector: 'app-add-edit-sub-categories',
  templateUrl: './add-edit-sub-categories.component.html',
  styleUrls: ['./add-edit-sub-categories.component.scss'],
})
export class AddEditSubCategoriesComponent {
  subCategory: IsubCategories = {} as IsubCategories;
  updateSubCategory: IsubCategories = {} as IsubCategories;

  isEdit: boolean = false;
  paramID: any = '';
  categryName?: Icategories;
  parentCategory: Icategories = {} as Icategories;
  categoriesList: Icategories[] = [];
  subCategoriesList: IsubCategories[] = [];
  xx: string = '';

  constructor(
    public CategoryAPI: CategoriesService,
    public SubCategoriesAPI: SubCategoriesServicesService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.paramID = this.activatedRoute.snapshot.paramMap.get('id');
    // console.log(this.paramID);

    this.CategoryAPI.getAllCategories().subscribe((data) => {
      this.categoriesList = data;
      // console.log(this.categoriesList);

      if (this.categoriesList.some((item) => item._id === this.paramID)) {
        // to get the parent category from passing id in url params
        this.CategoryAPI.getCategoryById(this.paramID).subscribe((data) => {
          this.parentCategory = data;
          console.log(this.parentCategory.name, this.parentCategory._id);
          // console.log(this.subCategory);
        });
      } else {
        console.log('isEdit');

        this.isEdit = true;
        this.SubCategoriesAPI.getSubcategoryByIdy(this.paramID).subscribe({
          next: (data) => {
            console.log(data);
            this.updateSubCategory = data;

            // to get parent category Name to show when i edit the sub category
            this.categryName = data.CategoryID.name;
            console.log(this.categryName);
            console.log(this.updateSubCategory);
          },
          error: (err) => {
            console.log(err);
          },
        });
      }
      this.SubCategoriesAPI.getAllSubcategories().subscribe((data) => {
        this.subCategoriesList = data;
      });
    });
  }

  addSubCategory() {
    console.log(this.parentCategory._id);

    this.subCategory.CategoryID = this.parentCategory._id;
    console.log(this.subCategory);
    // to check sub category Name
    var isFound = this.subCategoriesList.find(
      (list) => list.title == this.updateSubCategory.title
    );

    if (isFound) {
      alert('Sub Category Already Exist ... !!');
    } else {
      console.log(this.subCategory);

      this.SubCategoriesAPI.addSubcategory(this.subCategory).subscribe({
        next: (data) => {
          console.log(this.subCategory);
          alert('category added successfully');
          this.router.navigate(['/subcategories'], {
            queryParams: { parent: this.parentCategory._id },
          });
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }

  editSubCategory() {
    if (this.isEdit) {
      this.paramID = this.activatedRoute.snapshot.paramMap.get('id');
      console.log(this.subCategoriesList);
      console.log(this.categoriesList);

      // to check sub category Name
      var isFound = false;

      // to get parent category Name
      this.categryName = this.categoriesList.find(
        (category) => category._id == this.updateSubCategory.CategoryID
      );
      if (isFound) {
        alert('Change Sub Category Name To Edit ... !!');
      } else {
        console.log(this.categryName?.name);
        this.SubCategoriesAPI.editSubCategory(
          this.paramID,
          this.updateSubCategory
        ).subscribe((data) => {
          alert('SubCategory updated successfully');
          console.log(data);
          this.router.navigate(['/subcategories'], {
            queryParams: { parent: this.updateSubCategory.CategoryID._id },
          });
        });
      }
    }
  }
}
