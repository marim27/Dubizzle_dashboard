import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
import { Location } from '@angular/common';
import { environment } from 'src/environments/environment.development';
@Component({
  selector: 'app-singel-product',
  templateUrl: './singel-product.component.html',
  styleUrls: ['./singel-product.component.scss']
})
export class SingelProductComponent implements OnInit {
  productId: any;
  singleProduct?: Iproduct;
  categoryName?: Icategories  //display Category name
  categoryImg: any
  productsStatus?: Iproduct  // toggle Product status
  userName?: IUser
  allUser: IUser[] = []
  allProducts: Iproduct[] = []
  imagePath: string = ''
  constructor(private getIdFromUrl: ActivatedRoute, public productAPI: ProductService,
    public CategoryAPI: CategoriesService, public SubCategoriesAPI: SubCategoriesServicesService,
    public locationAPI: LocationService, public UserAPI: UserService, public router: Router, private location: Location) { }

  ngOnInit(): void {
    this.imagePath = environment.BaseApiURL
    this.getSingleProduct()
  }
  back() {
    this.location.back();
  }
  // get single product
  getSingleProduct() {
    this.getIdFromUrl.paramMap.subscribe({
      next: (params) => {
        this.productId = params.get('id');
        this.productAPI.getProductById(this.productId).subscribe({
          next: (data) => {
            this.singleProduct = data.single;
            console.log(data);
            console.log(data.single);

          },
        });
      },
    });
  }

  // toggle product status
  checkProductStatus(data: any, id: any) {
    let obj = {
      productStatus: data.productStatus
    };
    this.productAPI.updateProductStatus(obj, id).subscribe({
      next: (data) => {
        this.getSingleProduct()
        // console.log(data);
      },
      error: (err) => {
        console.log('status error');
      },
    });
  }
  showSellerProduct(userId: any) {
    this.router.navigate(['/products/sellerProduct', userId]);
  }
  // delete Product function
  deleteProduct(id: any) {
    let _confirm = confirm('Are you sure to delete this Product');
    if (_confirm) {
      this.productAPI.deletePriduct(id).subscribe({
        next: (data) => {
          this.router.navigate(['/Categories/Categories']);
          console.log(data);
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }
}
