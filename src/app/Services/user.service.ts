import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, tap, throwError } from 'rxjs';
import { credentials } from '../Models/Credentials';
import { Urls } from '../HttpClientUrls/Urls';
import { User } from '../Models/User';
import { Country } from '../Models/country';
import { ERole } from '../Models/erole';
import { Speciality } from '../Models/speciality';
import { TokenRegisterService } from './token-register.service';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class UserService {
  formModal: any;



  constructor(private httpClient: HttpClient, private authservice: TokenRegisterService) { }

  signin(userCredentials: credentials): Observable<any> {
    return this.httpClient.post<credentials>(Urls.SIGNIN_URL, userCredentials, httpOptions)
      .pipe(
        tap(response => {
          this.authservice.setLoggedInStatus(true);
        })
      );
  }

  getallusers(): Observable<User[]> {
    return this.httpClient.get<User[]>(Urls.Listusers);
  }

  uploadcv(userId: number, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file, file.name);
  
    if (userId !== undefined && userId !== null) {
      formData.append('userId', userId.toString());
    } else {
      // Handle the case when userId is undefined or null, e.g., by logging an error or returning an error Observable.
      console.error('userId is undefined or null');
      return throwError('userId is undefined or null');
    }
  
    let headers = new HttpHeaders().set('enctype', 'multipart/form-data'); // Corrected header setting
  
    const uploadUrl = Urls.loadCV(userId);
  
    return this.httpClient.post(uploadUrl, formData, { headers });
  }
  
  

  Signup(user: User): Observable<User> { return this.httpClient.post<User>(Urls.SIGNUP_URL, user); }
  
  uploadImage(userId: number, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file, file.name);
    formData.append('userId', userId.toString());
  
    const headers = new HttpHeaders();

  
    // Call the URL template function with userId
    const uploadUrl = Urls.UPLOAD_IMG(userId);
  
    return this.httpClient.post(uploadUrl, formData, { headers });
  }
  
  


  ListCountries(): Observable<Country[]> { return this.httpClient.get<Country[]>(Urls.List_Countries); }
  ListRoles(): Observable<ERole[]> { return this.httpClient.get<ERole[]>(Urls.List_Roles); }
  ListSpeciality(): Observable<Speciality[]> { return this.httpClient.get<Speciality[]>(Urls.List_Speciality); }

  forgetpassword(token: string, password: string): Observable<any> {
    const url = Urls.FORGET_PASSWORD.replace('{{token}}', token).replace('{{password}}', password);
    return this.httpClient.get<any>(url);
  }

  Resetbyemail(email: string): Observable<any> {
    const urls = Urls.RESET_PWD_Email.replace('{{email}}', email);
    return this.httpClient.get<any>(urls);
  }



  updateprofile(id: number, user: User): Observable<Object> {
    const url = `${Urls.UPDATE_PROFILE.replace('${userId}', id.toString())}`;
    return this.httpClient.put(url, user);
  }


  blockUser(id: number): Observable<boolean> {
    const url = `${Urls.Blockuser.replace('${id}', id.toString())}`;

    return this.httpClient.post<boolean>(url, id);
  }
  unblockUser(id: number): Observable<boolean> {
    const url = `${Urls.Unblockuser.replace('${id}', id.toString())}`;

    return this.httpClient.post<boolean>(url, id);
  }

  reset_password(reset: any): Observable<any> {
    const FORGET_PASSWORD_BASE_URL = 'http://localhost:8095/users/reset_password';
    const url = `${FORGET_PASSWORD_BASE_URL}/${reset.token}/${reset.password}`;

    return this.httpClient.post(url, {
      mail: reset.mail,
    }, httpOptions);
  }


}
