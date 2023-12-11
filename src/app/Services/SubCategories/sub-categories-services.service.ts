import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Icategories } from 'src/app/Models/icategories';
import { IsubCategories } from 'src/app/Models/isub-categories';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class SubCategoriesServicesService {
  // to make headers
  http = {};
  perantCategory: Icategories|undefined; 


  constructor(private httpClint: HttpClient) {
    this.http = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
  }

  // add new subcategory
  addSubcategory(newSub: IsubCategories): Observable<IsubCategories> {
    console.log(newSub);
    return this.httpClint.post<IsubCategories>(
      `${environment.BaseApiURL}/subcategories`,
      JSON.stringify(newSub),
      this.http
    );
  }

  //get all subcategory
  getAllSubcategories(): Observable<IsubCategories[]> {
    return this.httpClint
      .get<{ data: { data: IsubCategories[] } }>(
        `${environment.BaseApiURL}/subcategories`
      )
      .pipe(map((response) => response.data.data));
  }

  // filter by subcategory by id

  getSubcategoryByIdy(id: string): Observable<IsubCategories> {
    return this.httpClint
      .get<{ data: { subCategory: IsubCategories } }>(
        `${environment.BaseApiURL}/subcategories/${id}`
      )
      .pipe(map((response) => response.data.subCategory));
  }

  // filter by subcategory by parent categoryID when object is {massage : , subcategory{}} in node controllers

  // getSubcategoriesByParentCategoryID(id: string): Observable<IsubCategories[]> {
  //   return this.httpClint
  //     .get<{ data: { subCategory: IsubCategories[] } }>(
  //       `${environment.BaseApiURL}/subcategories/CategoryID?CategoryID=${id}`
  //     )
  //     .pipe(map((response) => response.data.subCategory));;
  // }

  // filter by subcategory by parent categoryID when json(subCategory) in node controllers

  getSubcategoriesByParentCategoryID(id: string): Observable<IsubCategories[]> {
    
    return this.httpClint.get<IsubCategories[]>(
      `${environment.BaseApiURL}/subcategories/CategoryID?CategoryID=${id}`
    );
  }

  // filter by subcategory Name
  getSubcategoriesByName(name: string): Observable<IsubCategories> {
    return this.httpClint.get<IsubCategories>(
      `${environment.BaseApiURL}/subcategories/title?title=${name}`
    );
  }

  // update subcategory
  editSubCategory(id: string, data: any): Observable<IsubCategories> {
    return this.httpClint.patch<IsubCategories>(
      `${environment.BaseApiURL}/subcategories/${id}`,
      JSON.stringify(data),
      this.http
    );
  }

  //delete subcategory
  deleteSubCategory(id: string): Observable<IsubCategories> {
    return this.httpClint.delete<IsubCategories>(
      `${environment.BaseApiURL}/subcategories/${id}`,
      this.http
    );
  }

  



}
