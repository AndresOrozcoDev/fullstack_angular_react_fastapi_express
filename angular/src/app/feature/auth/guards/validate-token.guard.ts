import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

export const validateTokenGuard: CanActivateFn = (route, state) => {  

  const router = inject(Router);
  const token = localStorage.getItem('token');

  if (token) {
    const decodedToken: any = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000);

    if (decodedToken.exp > currentTime) {
      return true;
    } else {
      router.navigate(['/login']);
      return false;
    }
  }

  router.navigate(['/login']);
  return false;
};
