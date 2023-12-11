import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Iadmin } from '../../Models/iadmin';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiURL = 'http://localhost:5555/admins';
  private isLogBehavior: BehaviorSubject<boolean>;
  currentAdmin: Iadmin | null = null;

  constructor(private http: HttpClient) {
    this.isLogBehavior = new BehaviorSubject<boolean>(this.isAdminLoggedIn);
  }

  // login(email: string, password: string): Observable<boolean> {
  //   const loginData = { email, password };
  //   return this.http.post<any>(`${this.apiURL}/login`, loginData)
  //     .pipe(
  //       map(response => {
  //         if (response.token) {
  //           localStorage.setItem('token', response.token);
  //           this.currentAdmin = response.admin;
  //           this.isLogBehavior.next(true);
  //           return true;
  //         } else {
  //           this.isLogBehavior.next(false);
  //           return false;
  //         }
  //       },

  //       )
  //     );
  // }

  login(email: string, password: string): Observable<boolean> {
    const loginData = { email, password };
    return this.http.post<any>(`${this.apiURL}/login`, loginData)
      .pipe(
        map(response => {
          alert(response.admin);
          localStorage.setItem('adminName', response.admin.adminName);
          try {
            if (response.token) {
              localStorage.setItem('token', response.token);
              this.currentAdmin = response.admin;
              this.isLogBehavior.next(true);
              return true;
            } else {
              this.isLogBehavior.next(false);
              return false;
            }
          } catch (error) {
            console.error('An error occurred during login:', error);
            this.isLogBehavior.next(false);
            return false;
          }
        })
      );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('adminName');
    this.isLogBehavior.next(false);
  }

  get isAdminLoggedIn(): boolean {
    return localStorage.getItem('token') ? true : false;
  }

  getAdminStatus(): Observable<boolean> {
    return this.isLogBehavior.asObservable();
  }

  updateAdminData(admin: Iadmin): Observable<Iadmin> {
    const url = `${this.apiURL}/${admin._id}`;
    return this.http.patch<Iadmin>(url, admin);
  }
}
