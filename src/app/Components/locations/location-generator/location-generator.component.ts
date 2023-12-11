import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ILocation } from 'src/app/Models/ilocation';
import { LocationService } from 'src/app/Services/Location/location.service';

@Component({
  selector: 'app-location-generator',
  templateUrl: './location-generator.component.html',
  styleUrls: ['./location-generator.component.scss'],
})
export class LocationGeneratorComponent {
  location: ILocation = {} as ILocation;
  upDatedlocation: ILocation = {} as ILocation;
  prevImage: string = '';
  locations: ILocation[] = [];
  title: boolean = false;
  constructor(
    private locationService: LocationService,
    private router: Router,
    private activatedRouter: ActivatedRoute
  ) {}

  onImageSelected(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      this.location.image = file;
    }
  }

  addLocation() {
    let compare = this.locations.find(
      (l) => l.title === this.location.title || l.image === this.location.image
    );
    if (compare) {
      alert('The Title is already recorded in Database');
    } else {
      this.locationService.addNewLocation(this.location).subscribe({
        next: (data) => {
          // console.log("Data:", data);
          this.router.navigate(['/locations']);
        },
        error: (err) => {
          console.log('Error:', err);
        },
      });
    }
  }

  editLocation() {
    let compare = this.locations.find((l) => l.title === this.location.title);
    if (compare) {
      alert('The Title is already recorded in Database');
    } else {
      // if (this.location.image == null)
      console.log(this.location.image);

      this.locationService.editLocation(this.location).subscribe({
        next: (data) => {
          // console.log("Data:", data);
          this.router.navigate(['/locations']);
        },
        error: (err) => {
          console.log('Error:', err);
        },
      });
    }
  }

  id: any;
  ngOnInit(): void {
    this.locationService.getAllLocations().subscribe({
      next: (data) => {
        this.locations = data;
      },
    });

    this.activatedRouter.paramMap.subscribe((params) => {
      this.id = params.get('id');
    });
    if (this.id) {
      this.title = true;
      this.locationService.getLocationByID(this.id).subscribe({
        next: (data) => {
          // console.log(data);
          this.location = data;
          // console.log(this.location);
          this.prevImage = this.location.image
          this.upDatedlocation.image = this.location.image;
          this.upDatedlocation.title = this.location.title;
          this.upDatedlocation.artitle = this.location.artitle;
        },
      });
    }
  }
}

