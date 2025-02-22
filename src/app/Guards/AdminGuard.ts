import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenRegisterService } from '../Services/token-register.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(
    private router: Router,
    private tokenstorage: TokenRegisterService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const user = this.tokenstorage.getUser(); // Assuming you have a method to get the user object
    
    if (user && user.role === 'ADMIN') {
      return true; // User is an admin and can access the route
    } else {
      // User is not an admin, redirect to an unauthorized route or show an error message
      this.router.navigate(['/unauthorized']);
      return false;
    }
  }
}
