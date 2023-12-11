import { Component } from '@angular/core';
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
@Component({
  selector: 'app-seller-product',
  templateUrl: './seller-product.component.html',
  styleUrls: ['./seller-product.component.scss']
})
export class SellerProductComponent {
  sellerId: any;
  // singleProduct: Iproduct[] =[] as Iproduct[]
  singleProduct: Iproduct[] = []
  subCategoryTitle?: IsubCategories //display subCategory title
  categoryName?: Icategories  //display Category name
  locationTitle?: ILocation  //display Location title
  productsStatus?: Iproduct  // toggle Product status
  userName?: IUser  //get user name
  allUser: IUser[] = []
  pending: string = 'pending'; //get all pending filtered
  reject: string = 'reject'; //get all reject filtered
  accept: string = 'accept'; //get all accept filtered
  fiterStatus: string = 'all'; // to set to select when reload page
  CreatedDateAt: any;
  updatedDateAt: any;
  constructor(private getIdFromUrl: ActivatedRoute, public productAPI: ProductService,
    public CategoryAPI: CategoriesService, public SubCategoriesAPI: SubCategoriesServicesService,
    public locationAPI: LocationService, public UserAPI: UserService, public router: Router, private location: Location) { }


  ngOnInit(): void {
    this.getSingleProduct()
  }
  back() {
    this.location.back();
  }
  // get single product
  getSingleProduct() {
    this.getIdFromUrl.paramMap.subscribe({
      next: (params) => {
        this.sellerId = params.get('sellerId');
        this.productAPI.getProductByseller(this.sellerId).subscribe({
          next: (data) => {
            this.singleProduct = data.formattedProducts
            this.UserAPI.getUserByID(this.sellerId).subscribe((user) => {
              this.userName =user.data.user.username
              this.singleProduct = this.singleProduct.map((product) => {
                product.updatedAt = new Date(product.updatedAt).toLocaleDateString();
                return product;
              });
            });
          },
          error: (err) => {
            console.log("err");
          },
        });
      },
    });
  }


  fiterStatuss(fillterValue: string): Iproduct[] {
    if (fillterValue == 'all') {
      this.getSingleProduct()
    }
    console.log(this.fiterStatus);
    return this.singleProduct.filter((product: Iproduct) =>
      product.productStatus.includes(fillterValue));
  }
  filterProductByStatus() {
    this.singleProduct = this.fiterStatuss(this.fiterStatus);
  }
  // toggle product status
  checkProductStatus(data: any, id: any) {
    let obj = {
      productStatus: data.productStatus
    };
    this.productAPI.updateProductStatus(obj, id).subscribe({
      next: (data) => {
        this.filterProductByStatus()
        // console.log(data);
      },
      error: (err) => {
        console.log('status error');
      },
    });
  }
  showProduct(id: string) {
    this.router.navigate(['/products/singelProduct', id]);
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
