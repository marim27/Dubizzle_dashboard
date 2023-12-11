import { PackageService } from 'src/app/Services/Package/package.service';
import { Component, OnInit } from '@angular/core';
import { IPackage } from 'src/app/Models/ipackage';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-edit-package',
  templateUrl: './add-edit-package.component.html',
  styleUrls: ['./add-edit-package.component.scss'],
})
export class AddEditPackageComponent implements OnInit {
  package: IPackage = {} as IPackage;
  packages: IPackage[] = [];
  title: boolean = false;
  prevImage: string = '';
  upDatedpackage: IPackage = {} as IPackage;

  constructor(
    private packageService: PackageService,
    private router: Router,
    private activatedRouter: ActivatedRoute
  ) {}

  onImageSelected(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      this.package.image = file;
    }
  }

  addPackage() {
    let isFounded = this.packages.find((pac) => pac.name == this.package.name);
    if (isFounded) {
      alert('Duplicated Name, You must change it.');
    } else {
      this.packageService.addNewPackage(this.package).subscribe({
        next: (data) => {
          console.log('Data:', data);
          this.router.navigate(['/packages']);
        },
        error: (err) => {
          console.log('Error:', err);
        },
      });
    }
  }

  editPackage() {
    let isFounded = this.packages.find((pac) => pac.name == this.package.name);
    if (isFounded) {
      alert('Duplicated Name, You must change it.');
    } else {
      this.packageService.editPackage(this.package).subscribe({
        next: (data) => {
          console.log('Data:', data);
          this.router.navigate(['/packages']);
        },
        error: (err) => {
          console.log('Error:', err);
        },
      });
    }
  }
  id: any;
  ngOnInit(): void {
    this.activatedRouter.paramMap.subscribe((params) => {
      this.id = params.get('id');
    });
    if (this.id) {
      this.title = true;
      this.packageService.getPackageByID(this.id).subscribe({
        next: (data) => {
          // console.log(data);
          this.package = data;
          // console.log(this.package);
           this.upDatedpackage.image = this.package.image;
        },
      });
    }
    this.packageService.getAllPackages().subscribe({
      next: (data) => {
        this.packages = data;
      },
      error: (err) => {
        console.log('Error:', err);
      },
    });
  }
}
