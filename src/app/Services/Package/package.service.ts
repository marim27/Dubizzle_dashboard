import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPackage } from 'src/app/Models/ipackage';
import { IPackageOrder } from 'src/app/Models/ipackage-order';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class PackageService {
  http = {};
  constructor(private httpClient: HttpClient) {
    this.http = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
  }

  getAllPackages(): Observable<IPackage[]> {
    return this.httpClient.get<IPackage[]>(`${environment.BaseApiURL}/packages`);
  }

  getPackageByID(pId: any): Observable<IPackage> {
    return this.httpClient.get<IPackage>(
      `${environment.BaseApiURL}/packages/${pId}`
    );
  }

  addNewPackage(newPackage: IPackage): Observable<IPackage> {
    const formData = new FormData();
    formData.append('name', newPackage.name);
    formData.append('arName', newPackage.arName);
    formData.append('details', newPackage.details);
    formData.append('arDetails', newPackage.arDetails);
    formData.append('price', newPackage.price.toString());
    formData.append('numOfAds', newPackage.numOfAds.toString());
    formData.append('discount', newPackage.discount.toString());
    formData.append('expiryDays', newPackage.expiryDays.toString());
    formData.append('TitleadsDaysDetails', newPackage.TitleadsDaysDetails);
    formData.append('adsDaysDetails', newPackage.adsDaysDetails);
    formData.append('arTitleadsDaysDetails', newPackage.arTitleadsDaysDetails);
    formData.append('aradsDaysDetails', newPackage.aradsDaysDetails);
    formData.append('image', newPackage.image);

    return this.httpClient.post<IPackage>(
      `${environment.BaseApiURL}/packages`,
      formData
      // JSON.stringify(newPackage),
      // this.http
    );
  }

  editPackage(newPackage: IPackage): Observable<IPackage> {
    console.log(newPackage);
     const formData = new FormData();
     formData.append('name', newPackage.name);
     formData.append('arName', newPackage.arName);
     formData.append('details', newPackage.details);
     formData.append('arDetails', newPackage.arDetails);
     formData.append('price', newPackage.price.toString());
     formData.append('numOfAds', newPackage.numOfAds.toString());
     formData.append('discount', newPackage.discount.toString());
     formData.append('expiryDays', newPackage.expiryDays.toString());
    formData.append('TitleadsDaysDetails', newPackage.TitleadsDaysDetails);
    formData.append('arTitleadsDaysDetails', newPackage.arTitleadsDaysDetails);
    formData.append('adsDaysDetails', newPackage.adsDaysDetails);
    formData.append('aradsDaysDetails', newPackage.aradsDaysDetails);
    formData.append('image', newPackage.image);
    return this.httpClient.patch<IPackage>(
      `${environment.BaseApiURL}/packages/${newPackage._id}`,
      formData
      // JSON.stringify(newPackage),
      // this.http
    );
  }

  deletePackage(id: any): Observable<IPackage> {
    return this.httpClient.delete<IPackage>(
      `${environment.BaseApiURL}/packages/${id}`
    );
  }

  getAllPackageOrders(): Observable<IPackageOrder[]> {
    return this.httpClient.get<IPackageOrder[]>(
      `${environment.BaseApiURL}/packageOrders`
    );
  }
}
