import { UserService } from 'src/app/Services/User/user.service';
import { PackageService } from 'src/app/Services/Package/package.service';
import { Component, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/Services/categories.service';
import { ProductService } from 'src/app/Services/products/product.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit{
  categoryCount:any;
  userCount:any;
  productCount:any;
  packageCount:number=0;
  constructor(public CategoryAPI: CategoriesService, public packageService:PackageService,
    public productAPI:ProductService, public userService:UserService){}
  ngOnInit(): void {
    // count Categories
    this.CategoryAPI.countCategories().subscribe(data => {
      this.categoryCount=data
      // console.log(this.categoryCount);
    })
    // count Packages
    this.packageService.getAllPackages().subscribe(data =>{
      this.packageCount = data.length;
    })
    // count products
    this.productAPI.getProductCount().subscribe(data=>{
      this.productCount=data;
    })
    // count Users
    this.userService.getAllUsers().subscribe(data =>{
      this.userCount = data.usersLength;
    })
  }
}
