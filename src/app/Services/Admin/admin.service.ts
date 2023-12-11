import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Iadmin } from 'src/app/Models/iadmin';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  http = {};

  constructor(private httpClint: HttpClient) {
    this.http = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
  }

  // add new admin
  addAdmin(newAdmin: Iadmin): Observable<Iadmin> {
    console.log(newAdmin);
    return this.httpClint.post<Iadmin>(
      `${environment.BaseApiURL}/admins`,
      JSON.stringify(newAdmin),
      this.http
    );
  }

  //get all Admin
  getAllAdmins(): Observable<Iadmin[]> {
    return this.httpClint.get<Iadmin[]>(`${environment.BaseApiURL}/admins`);
  }

  // filter Admin by id

  getAdminByIdy(id: string): Observable<Iadmin> {
    return this.httpClint.get<Iadmin>(`${environment.BaseApiURL}/admins/${id}`);
  }

  // // filter by subcategory by parent categoryID when json(subCategory) in node controllers

  // getSubcategoriesByParentCategoryID(id: string): Observable<IsubCategories[]> {
  //   return this.httpClint.get<IsubCategories[]>(
  //     `${environment.BaseApiURL}/subcategories/CategoryID?CategoryID=${id}`
  //   );
  // }

  // // filter by subcategory Name
  // getSubcategoriesByName(name: string): Observable<IsubCategories> {
  //   return this.httpClint.get<IsubCategories>(
  //     `${environment.BaseApiURL}/subcategories/title?title=${name}`
  //   );
  // }

  // update Admin
  updateAdmin(id: string, data: any): Observable<Iadmin> {
    return this.httpClint.patch<Iadmin>(
      `${environment.BaseApiURL}/admins/${id}`,
      JSON.stringify(data),
      this.http
    );
  }

  //delete Admin
  deleteAdmin(id: string): Observable<Iadmin> {
    return this.httpClint.delete<Iadmin>(
      `${environment.BaseApiURL}/admins/${id}`,
      this.http
    );
  }
}
