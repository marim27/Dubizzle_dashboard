import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/Services/Auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnDestroy {
  email = '';
  password = '';
  errorMessage = '';
  subscription: Subscription;
  isLoading = false;

  constructor(private authService: AuthService, private router: Router) {
    this.subscription = this.authService.getAdminStatus().subscribe(isLoggedIn => {
      if (isLoggedIn) {
        this.errorMessage = '';
        // alert("you are logged in already !!!!!!!")
        this.router.navigate(['/']);
      }
    });
  }

  onSubmit() {
    this.isLoading = true;
    this.authService.login(this.email, this.password).subscribe(
      loginSuccess => {
        this.isLoading = false;
        if (loginSuccess) {
          this.errorMessage = '';
          this.router.navigate(['/']);
          window.location.reload();
        } else {
          this.errorMessage = 'Username or password is incorrect. Please try again.';
          this.email = '';
          this.password = '';
        }
      },
      error => {
        this.isLoading = false;
        this.errorMessage = 'An error occurred during login. Please try again later.';
        console.error('Login error:', error);
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
