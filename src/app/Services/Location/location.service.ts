import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ILocation } from 'src/app/Models/ilocation';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  http = {};
  constructor(private httpClient: HttpClient) {
    this.http = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
  }

  getAllLocations(): Observable<ILocation[]> {
    return this.httpClient
      .get<{ data: { data: ILocation[] } }>('http://localhost:5555/location')
      .pipe(map((response) => response.data.data));
  }

  getLocationByID(pId: any): Observable<ILocation> {
    return this.httpClient
      .get<{ data: { locations: ILocation } }>(
        'http://localhost:5555/location/' + pId
      )
      .pipe(map((response) => response.data.locations));
  }

  //   addcategory(newC: Icategories): Observable<Icategories> {
  //     const formData = new FormData();
  //     formData.append('image', JSON.stringify(newC));
  //     return this.httpClint.post<Icategories>(
  //       ${environment.BaseApiURL}/categories,
  //       formData,
  //       this.httpHeadersOptoins
  //     );
  //   }

  addNewLocation(newLocation: ILocation): Observable<ILocation> {
    const formData = new FormData();
    formData.append('title', newLocation.title);
    formData.append('artitle', newLocation.artitle);
    formData.append('image', newLocation.image);

    return this.httpClient.post<ILocation>(
      'http://localhost:5555/location',
      formData
    );
  }

  editLocation(newLocation: ILocation): Observable<ILocation> {
    // console.log(newLocation);
      const formData = new FormData();
      formData.append('title', newLocation.title);
      formData.append('artitle', newLocation.artitle);
      formData.append('image', newLocation.image);
      // console.log(formData);
    
    return this.httpClient.patch<ILocation>(
      `http://localhost:5555/location/${newLocation._id}`,
      formData
    );
  }

  deleteLocation(id: any): Observable<ILocation> {
    return this.httpClient.delete<ILocation>(
      `http://localhost:5555/location/${id}`
    );
  }
}
