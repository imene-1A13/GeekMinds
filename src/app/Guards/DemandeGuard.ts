import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { TokenRegisterService } from '../Services/token-register.service';
import { map } from 'rxjs/operators'; 
import { User } from '../Models/User';

@Injectable({
  providedIn: 'root'
})
export class DemandeGuard implements CanActivate {
  constructor(
    private http: HttpClient,
    private router: Router,
    private tokenstorage: TokenRegisterService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const user: User = this.tokenstorage.getUser(); 
    const userId = user.idUser; 
    if (!userId) {
      return false;
    }

    return this.http.get<boolean>(`http://localhost:8095/users/demandeforuser/${userId}`).pipe(
      map((isDemandeAccepted: any) => {
        if (isDemandeAccepted) {
          return true; 
        } else {
          this.router.navigate(['/access-denied']);
          return false;
        }
      })
    );
  }
}
