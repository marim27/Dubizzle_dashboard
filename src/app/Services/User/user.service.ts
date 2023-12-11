import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/Models/iuser';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  http = {};
  constructor(private httpClient: HttpClient) {
    this.http = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
  }

  getAllUsers(): Observable<any> {
    return this.httpClient.get<IUser[]>(`${environment.BaseApiURL}/users`);
  }

  getUserByID(uId: any): Observable<any> {
    return this.httpClient.get<any>(
      `${environment.BaseApiURL}/users/${uId}`
    );
  }

  editUserStatus(uid: string,newStatus: string): Observable<IUser> {
    return this.httpClient.patch<IUser>(
      `${environment.BaseApiURL}/users/${uid}`,
      JSON.stringify({"userStatus":newStatus}),
      this.http
    );
  }

  deleteUser(uId: any): Observable<any> {
    return this.httpClient.delete<any>(
      `${environment.BaseApiURL}/users/${uId}`
    );
  }

  getUsersByLocationID(id: string): Observable<any> {
    return this.httpClient.get<any>(
      `${environment.BaseApiURL}/users/locationID?locationID=${id}`
    );
  }

}
