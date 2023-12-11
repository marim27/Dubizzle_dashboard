import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminsComponent } from './admins/admins.component';
import { AddEditAdminsComponent } from './add-edit-admins/add-edit-admins.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', component: AdminsComponent },
  { path: 'add', component: AddEditAdminsComponent },
  { path: 'edit/:id', component: AddEditAdminsComponent },
];

@NgModule({
  declarations: [AdminsComponent, AddEditAdminsComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
})
export class AdminsModule {}
