import { Component } from '@angular/core';
import { AuthService } from 'src/app/Services/Auth/auth.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent {
  adminName:any
  constructor(public authService: AuthService){
    // console.log(localStorage.getItem("adminName"));
    this.adminName=localStorage.getItem("adminName")
  }
}
