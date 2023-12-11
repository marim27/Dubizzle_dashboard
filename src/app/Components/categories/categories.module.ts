import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoriesComponent } from './categories/categories.component';
import { AddEditCategoryComponent } from './add-edit-category/add-edit-category.component';

const routes:Routes=[
  {path:'newCategory',component:AddEditCategoryComponent,title:'Add Category'},
  {path:'editCategory/:id',component:AddEditCategoryComponent,title:'Edit Category'},
  {path:'Categories',component:CategoriesComponent,title:'Categories'}
]

@NgModule({
  declarations: [
    CategoriesComponent,
    AddEditCategoryComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class CategoriesModule { }
