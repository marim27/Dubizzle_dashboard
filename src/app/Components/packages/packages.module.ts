import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllPackagesComponent } from './all-packages/all-packages.component';
import { AddEditPackageComponent } from './add-edit-package/add-edit-package.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PackageOrdersComponent } from './package-orders/package-orders.component';
import { PackageOrderChartComponent } from './package-order-chart/package-order-chart.component';
import { NotFoundComponent } from '../not-found/not-found.component';
const routes: Routes=[
  {path:"", component:PackageOrdersComponent},
  {path:"view", component:AllPackagesComponent},
  {path:"edit/:id", component:AddEditPackageComponent},
  {path:"add", component:AddEditPackageComponent},
  {path:"**", component:NotFoundComponent}
]

@NgModule({
  declarations: [
    AllPackagesComponent,
    AddEditPackageComponent,
    PackageOrdersComponent, 
    PackageOrderChartComponent 
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  exports:[PackageOrderChartComponent]
})
export class PackagesModule { }
