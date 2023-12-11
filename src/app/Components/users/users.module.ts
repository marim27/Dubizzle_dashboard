import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllUsersComponent } from './all-users/all-users.component';
import { NotFoundComponent } from '../not-found/not-found.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

const routes:Routes=[
  {path:'', component:AllUsersComponent, title:'All Users'},
  {path:'**',component:NotFoundComponent, title:'Not Found'}
]

@NgModule({
  declarations: [
    AllUsersComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
})
export class UsersModule { }
