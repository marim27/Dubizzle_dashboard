import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Iproduct } from 'src/app/Models/iproduct';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private httpHeadersOptoins = {};
  constructor(private httpClint: HttpClient) {
    this.httpHeadersOptoins = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
  }
  // create a new priduct
  addNewPriduct(newProduct:Iproduct):Observable<Iproduct> {
    return this.httpClint.post<Iproduct>(`${environment.BaseApiURL}/products`,JSON.stringify(newProduct),this.httpHeadersOptoins);
  }

  // get all products
  getAllProducts():Observable<Iproduct[]>{
    return this.httpClint.get<Iproduct[]>(`${environment.BaseApiURL}/products`)
  }
  getProductsPage(page:number):Observable<Iproduct[]>{
    return this.httpClint.get<Iproduct[]>(`${environment.BaseApiURL}/products/page/${page}`)
  }

  // get product by id
  getProductById(prdID:string):Observable<any>{
    return this.httpClint.get<Iproduct>(`${environment.BaseApiURL}/products/${prdID}`)
  }

  // get product by status
  getProductByStatus(status:string):Observable<Iproduct>{
    return this.httpClint.get<Iproduct>(`${environment.BaseApiURL}/products/productStatus/${status}`)
  }

  // get product by seller
  getProductByseller(seller:string):Observable<any>{
    return this.httpClint.get<any>(`${environment.BaseApiURL}/products/seller?seller=${seller}`)
  }
  // get all products number
  getProductCount():Observable<Iproduct[]>{
    return this.httpClint.get<Iproduct[]>(`${environment.BaseApiURL}/products/productcount/productcount`)
  }

  // update the product status
  updateProductStatus(status:any,prdID:string):Observable<Iproduct>{
    return this.httpClint.patch<Iproduct>(`${environment.BaseApiURL}/products/status/${prdID}`,JSON.stringify(status), this.httpHeadersOptoins)
  }

  //delete the product
  deletePriduct(prdID:string):Observable<Iproduct>{
    return this.httpClint.delete<Iproduct>(`${environment.BaseApiURL}/products/${prdID}`,this.httpHeadersOptoins);
  }
}
