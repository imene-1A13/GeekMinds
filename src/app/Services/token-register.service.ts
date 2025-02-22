import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenRegisterService {
  
private isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
private readonly isLoggedInKey = 'isLoggedIn';

public isLoggedIn$: Observable<boolean> = this.isLoggedInSubject.asObservable();
constructor() {    this.isLoggedInSubject.next(this.getLoggedInStatus());
}
isUserBlocked(): boolean {
  const user = this.getUser();
  return user && user.blocked === true;
}
  signOut()
  {window.sessionStorage.clear();}

  public saveToken(token:string)
  {window.sessionStorage.removeItem(TOKEN_KEY);
  window.sessionStorage.setItem(TOKEN_KEY,token);
}

public getToken():string{return sessionStorage.getItem(TOKEN_KEY)||'{}';}

public saveUser(user: any): void {
  window.sessionStorage.removeItem(USER_KEY);
  window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
}

public getUser() {
  return JSON.parse(sessionStorage.getItem(USER_KEY)|| '{}');
}


getLoggedInStatus(): boolean {
  const storedStatus = sessionStorage.getItem(this.isLoggedInKey);
  return storedStatus !== null ? JSON.parse(storedStatus) : false;
}

setLoggedInStatus(isLoggedIn: boolean): void {
  sessionStorage.setItem(this.isLoggedInKey, JSON.stringify(isLoggedIn));
  this.isLoggedInSubject.next(isLoggedIn);
}


}
