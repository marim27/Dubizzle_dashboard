import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IPackage } from 'src/app/Models/ipackage';
import { PackageService } from 'src/app/Services/Package/package.service';
// import { IPackage } from 'src/app/Models/ipackage';

@Component({
  selector: 'app-all-packages',
  templateUrl: './all-packages.component.html',
  styleUrls: ['./all-packages.component.scss']
})
export class AllPackagesComponent {
  packages: IPackage[] = []
  constructor(public packageService: PackageService, private router: Router) {
  }

  ngOnInit(): void {
    this.packageService.getAllPackages().subscribe(
      data => {
        this.packages = data;
        // console.log(data);
      }
    )
  }

  edit(pid: any) {
    this.router.navigate(['/packages/edit/', pid])
  }

  delete(pid: any) {
    let _confirm = confirm("Are you sure to delete this package ^_^")
    if (_confirm) {
      this.packageService.deletePackage(pid).subscribe({
        next: (data) => {
          console.log("Data:", data);
          this.packages = this.packages.filter(p => p._id != pid)
        },
        error: (err) => {
          console.log('Error:', err)
        }
      })
    }
  }

}
