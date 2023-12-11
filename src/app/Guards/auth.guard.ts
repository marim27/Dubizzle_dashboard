import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../Services/Auth/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const adminService = inject(AuthService);
  const router = inject(Router);

  if (adminService.isAdminLoggedIn) {
    return true;
  } else {
    alert('Please login First');
    router.navigate(['/login']);
    return false;
  }
};
