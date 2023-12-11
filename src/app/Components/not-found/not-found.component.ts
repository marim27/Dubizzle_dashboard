import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent {
  constructor(private location: Location, private router: Router) { }
  back() {
    this.location.back()
  }

  home() {
    this.router.navigate(['/Home']).then(() => {
      // Reload the page
      window.location.reload();
    })
  }
}
