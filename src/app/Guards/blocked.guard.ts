import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenRegisterService } from '../Services/token-register.service';


@Injectable({
  providedIn: 'root'
})
export class BlockedGuard implements CanActivate {
  constructor(   private router :Router, private tokenstorage: TokenRegisterService 
    ){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  const isblocked=this.tokenstorage.isUserBlocked();
  if(isblocked)
  {this.router.navigate(['**']);
    return false;}
  
      return true;
  }

  
}
