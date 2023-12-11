import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationProfileComponent } from './location-profile/location-profile.component';
import { LocationGeneratorComponent } from './location-generator/location-generator.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

const routes: Routes=[
  {path:"", component:LocationProfileComponent},
  {path:"view", component:LocationProfileComponent},
  {path:"edit/:id", component:LocationGeneratorComponent},
  {path:"add", component:LocationGeneratorComponent},
]

@NgModule({
  declarations: [
    LocationProfileComponent,
    LocationGeneratorComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes)
  ]
})
export class LocationsModule { }
