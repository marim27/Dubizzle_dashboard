import { Component, OnInit } from '@angular/core';

import { SubCategoriesServicesService } from 'src/app/Services/SubCategories/sub-categories-services.service';
import { Icategories } from 'src/app/Models/icategories';
import { IsubCategories } from 'src/app/Models/isub-categories';
import { CategoriesService } from 'src/app/Services/categories.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sub-categories',
  templateUrl: './sub-categories.component.html',
  styleUrls: ['./sub-categories.component.scss'],
})
export class SubCategoriesComponent implements OnInit {
  selectedCategoryId: string = ''; //    // to set defualt selected when reload page
  selectedCategoryName?: string = '';
  subCategoriesList: IsubCategories[] = [];
  categoriesList: Icategories[] = [];
  filteredSubCategories: IsubCategories[] = [];

  constructor(
    public CategoryAPI: CategoriesService,
    public SubCategoriesAPI: SubCategoriesServicesService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.CategoryAPI.getAllCategories().subscribe((data) => {
      this.categoriesList = data;
    });
                console.log(this.selectedCategoryId);

    // to set defualt selected when reload page
    this.SubCategoriesAPI.getSubcategoriesByParentCategoryID(
      this.selectedCategoryId
    ).subscribe((data) => {

      this.subCategoriesList = data;
      this.filteredSubCategories = this.subCategoriesList;
    });

    this.wating();
  }

  wating() {
    // get parentID from url and track any changes
    this.activatedRoute.queryParams.subscribe((data) => {
      const parent = data['parent'];
      console.log(parent);

      if (parent) {
        this.selectedCategoryId = parent;
        this.SubCategoriesAPI.getSubcategoriesByParentCategoryID(
          parent
        ).subscribe(
          (data) => {
            this.subCategoriesList = data;
            this.filteredSubCategories = this.subCategoriesList;

            console.log(data);

            /////////////////
            this.CategoryAPI.getAllCategories().subscribe(
              (data) => {
                this.categoriesList = data;

                //get selected parent category name
                this.selectedCategoryName = this.categoriesList.find(
                  (category) => category._id === parent
                )?.name;

                console.log(this.categoriesList);
                console.log(this.subCategoriesList);
                console.log(this.selectedCategoryName);
              },
              (error) => {
                console.error('Error fetching categories:', error);
              }
            );
            /////////////////
          },
          (error) => {
            console.error('Error fetching subcategories:', error);
          }
        );
      }
    });
  }

  // get subcategory id

  onSelectedCategoryChange() {
    console.log(this.selectedCategoryId);
    this.SubCategoriesAPI.getSubcategoriesByParentCategoryID(
      this.selectedCategoryId
    ).subscribe((data) => {
      this.subCategoriesList = data;
      this.filteredSubCategories = this.subCategoriesList;
      console.log(data);
      //get selected parent category name
      this.selectedCategoryName = this.categoriesList.find(
        (category) => category._id === this.selectedCategoryId
      )?.name;
      console.log(this.subCategoriesList);
      console.log(this.selectedCategoryName);
    });
  }

  // show and hide input
  showInput: boolean = false;
  showHideInputSearch() {
    this.showInput = !this.showInput;
  }

  set listFillterSubCategory(value: string) {
    this.filteredSubCategories = this.categoryFilter(value);
    console.log(value);
    console.log(this.filteredSubCategories);
  }

  // fillter category functions
  categoryFilter(fillterValue: string): IsubCategories[] {
    fillterValue = fillterValue.toLowerCase();
    return this.subCategoriesList.filter((subCategory: IsubCategories) =>
      subCategory.title.toLowerCase().includes(fillterValue)
    );
  }

  // Edit method
  editFun(SubCategoryID: string) {
    this.router.navigate(['/subcategories/edit', SubCategoryID]);
  }

  // Delete method
  deleteFun(SubCategoryID: string) {
    const confirmed = confirm(
      'Are you sure you want to delete this SubCategory?'
    );
    if (confirmed) {
      this.SubCategoriesAPI.deleteSubCategory(SubCategoryID).subscribe({
        next: (data) => {
          console.log('Data:', data);
          this.filteredSubCategories = this.subCategoriesList.filter(
            (item) => item._id != SubCategoryID
          );
        },
        error: (err) => {
          console.log('Error:', err);
        },
      });
    }
  }
}
