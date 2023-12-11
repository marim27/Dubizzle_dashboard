import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ILocation } from 'src/app/Models/ilocation';
import { LocationService } from 'src/app/Services/Location/location.service';

@Component({
  selector: 'app-location-profile',
  templateUrl: './location-profile.component.html',
  styleUrls: ['./location-profile.component.scss'],
})
export class LocationProfileComponent {
  locations: ILocation[] = []
  filterdLocations: ILocation[] = []
  constructor(public locationService: LocationService, private router: Router) {
  }

  ngOnInit(): void {
    this.locationService.getAllLocations().subscribe(
      data => {
        this.locations = data;
        // console.log(this.locations);
        this.filterdLocations = this.locations;
        console.log(this.filterdLocations);
      }
    )
  }

  edit(pid: any) {
    this.router.navigate(['/locations/edit/', pid]);
  }

  delete(pid: any) {
    let _confirm = confirm('Are you sure to delete this Location ?');
    if (_confirm) {
      this.locationService.deleteLocation(pid).subscribe({
        next: (data) => {
          console.log('Data:', data);
          this.locations = this.locations.filter((l) => l._id != pid);
        },
        error: (err) => {
          console.log('Error:', err);
        },
      });
    }
  }
  set ListOfFiltterdLocations(value: string) {
    this.filterdLocations = this.locationFilter(value);
  }

  locationFilter(fillterValue: string): ILocation[] {
    fillterValue = fillterValue.toLowerCase();
    return this.locations.filter((loc: ILocation) => loc.title.toLowerCase().includes(fillterValue));
  }
  showInput: boolean = false
  showHideInputSearch() {
    this.showInput = !this.showInput;
  }
}
