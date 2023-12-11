import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubCategoriesComponent } from './sub-categories/sub-categories.component';
import { AddEditSubCategoriesComponent } from './add-edit-sub-categories/add-edit-sub-categories.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', component: SubCategoriesComponent },
  { path: 'edit/:id', component: AddEditSubCategoriesComponent },
  { path: 'add/:id', component: AddEditSubCategoriesComponent },
];

@NgModule({
  declarations: [SubCategoriesComponent, AddEditSubCategoriesComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
})
export class SubCategoriesModule {}
