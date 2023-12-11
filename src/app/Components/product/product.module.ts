import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product/product.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SingelProductComponent } from './singel-product/singel-product.component';
import { SellerProductComponent } from './seller-product/seller-product.component';
const routes:Routes=[
  {path:'product',component:ProductComponent,title:'Product'},
  {path:'singelProduct/:id',component:SingelProductComponent,title:'Product'},
  {path:'sellerProduct/:sellerId',component:SellerProductComponent,title:'seller Product'},
]


@NgModule({
  declarations: [
    ProductComponent,
    SingelProductComponent,
    SellerProductComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class ProductModule { }
