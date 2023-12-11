import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Icategories } from '../Models/icategories';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private httpHeadersOptoins = {};
  constructor(private httpClint: HttpClient) {
    this.httpHeadersOptoins = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
  }

  // add new category
  addcategory(newC: Icategories): Observable<Icategories> {
    const formData = new FormData();
    formData.append('name', newC.name);
    formData.append('arname', newC.arname);
    formData.append('image', newC.image);
    return this.httpClint.post<Icategories>(
      `${environment.BaseApiURL}/categories`,
      formData
    );
  }

  //get all categories
  getAllCategories(): Observable<Icategories[]> {
    return this.httpClint.get<Icategories[]>(
      `${environment.BaseApiURL}/categories`
    );
  }
  //get categories number
  countCategories(): Observable<Icategories[]> {
    return this.httpClint.get<Icategories[]>(
      `${environment.BaseApiURL}/categories/categorycount/categorycount`
    );
  }

  //git category by id
  getCategoryById(id: string): Observable<Icategories> {
    return this.httpClint.get<Icategories>(
      `${environment.BaseApiURL}/categories/${id}`,
      this.httpHeadersOptoins
    );
  }

  // git categories by name
  getCategoryByName(name: string): Observable<Icategories[]> {
    return this.httpClint.get<Icategories[]>(
      `${environment.BaseApiURL}/categories/name/${name}`
    );
  }

  // edit category
  editCategory(data: any, id: string): Observable<Icategories> {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('arname', data.arname);
  formData.append('image', data.image);
    return this.httpClint.patch<Icategories>(
      `${environment.BaseApiURL}/categories/${id}`,
      formData
    );
  }

  //delete category
  deleteCategory(id: string): Observable<Icategories> {
    return this.httpClint.delete<Icategories>(
      `${environment.BaseApiURL}/categories/${id}`,
      this.httpHeadersOptoins
    );
  }
}
