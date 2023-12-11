import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Icategories } from 'src/app/Models/icategories';
import { ILocation } from 'src/app/Models/ilocation';
import { Iproduct } from 'src/app/Models/iproduct';
import { IsubCategories } from 'src/app/Models/isub-categories';
import { IUser } from 'src/app/Models/iuser';
import { LocationService } from 'src/app/Services/Location/location.service';
import { SubCategoriesServicesService } from 'src/app/Services/SubCategories/sub-categories-services.service';
import { UserService } from 'src/app/Services/User/user.service';
import { CategoriesService } from 'src/app/Services/categories.service';
import { ProductService } from 'src/app/Services/products/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  allProducts: Iproduct[] = []; //get all products
  filterProduct: Iproduct[] = []; //get all products filtered
  allUser: IUser[] = []
  categoryName?: Icategories; //display Category name
  locationTitle?: ILocation; //display Location title
  userName?: IUser;
  pdate!: Iproduct;
  productsStatus?: Iproduct; // toggle Product status
  pending: string = 'pending'; //get all pending filtered
  reject: string = 'reject'; //get all reject filtered
  accept: string = 'accept'; //get all accept filtered
  disabled: string = 'disabled'; //get all disabled filtered
  fiterStatus: string = 'all'; // to set to select when reload page
  //set search filter by product title
  set listFillterProducts(value: string) {
    this.filterProduct = this.productFilter(value);
    console.log(this.filterProduct);
  }

  constructor(
    public productAPI: ProductService,
    public CategoryAPI: CategoriesService,
    public SubCategoriesAPI: SubCategoriesServicesService,
    public locationAPI: LocationService,
    public UserAPI: UserService,
    public showProductDitales: Router) { }
  CreatedDateAt: any;
  updatedDateAt: any;
  ngOnInit(): void {
    this.getalldata()
  }
  // get all products
  getalldata() {
    this.productAPI.getAllProducts().subscribe({
      next: (data) => {
        //get all products & display title of IDs ref
        this.allProducts = data;
        this.filterProduct = this.allProducts;
        this.filterProduct = this.filterProduct.map((product) => {
          this.CreatedDateAt = this.allProducts.find((creatdate) => creatdate.createdAt === product.createdAt);
          this.updatedDateAt = this.allProducts.find((updatedate) => updatedate.updatedAt === product.updatedAt);
          product.createdAt = new Date(this.CreatedDateAt.createdAt).toLocaleDateString();
          product.updatedAt = new Date(this.updatedDateAt.updatedAt).toLocaleDateString();
          return product;
        });
      }
    })
  }

  //function select filter by product status
  fiterStatuss(fillterValue: string): Iproduct[] {
    if (fillterValue == 'all') {
      this.getalldata()
      console.log(this.fiterStatus);
    }
    console.log(this.fiterStatus);
    return this.allProducts.filter((product: Iproduct) => product.productStatus.includes(fillterValue))
  }

  filterProductByStatus() {
    this.filterProduct = this.fiterStatuss(this.fiterStatus);
    // console.log(this.filterProduct);
  }

  // toggle product status
  checkProductStatus(data: any, id: string) {
    let obj = {
      productStatus: data.productStatus
    }
    console.log(obj.productStatus);
    this.productAPI.updateProductStatus(obj, id).subscribe({
      next: (data) => {
        // this.getalldata()
        //  console.log(data.productStatus);  //undefind
        // console.log(this.fiterStatuss(obj.productStatus));
        console.log(this.filterProduct);
        this.filterProductByStatus();
      },
      error: (err) => {
        console.log('status error');
      },
    });
  }

  // show and hide input
  showInput: boolean = false;
  showHideInputSearch() {
    this.showInput = !this.showInput;
  }
  //function search filter by product status
  productFilter(fillterValue: string): Iproduct[] {
    fillterValue = fillterValue.toLowerCase();
    return this.allProducts.filter((productTitle: Iproduct) => productTitle.title.toLowerCase().includes(fillterValue))
  };

  // show product details
  showProduct(id: string) {
    this.showProductDitales.navigate(['/products/singelProduct', id]);
  }
  // show seller product
  showSellerProduct(userId: any) {
    this.showProductDitales.navigate(['/products/sellerProduct', userId]);
  }

  // delete Product function
  deleteProduct(id: string) {
    let _confirm = confirm('Are you sure to delete this Product');
    if (_confirm) {
      this.productAPI.deletePriduct(id).subscribe({
        next: (data) => {
          this.filterProduct = this.filterProduct.filter(
            (product) => product._id != id
          );
          console.log(data);
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }

}
