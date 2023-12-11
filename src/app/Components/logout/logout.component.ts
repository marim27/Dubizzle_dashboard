import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/Auth/auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {
  constructor(private authService: AuthService , private router:Router) {}

  ngOnInit() {
    const confirmLogout = confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      this.authService.logout();
      alert("Logged out");
      this.router.navigate(['/login']);
    } else {
      this.router.navigate(['/']);
    }
  }
}
