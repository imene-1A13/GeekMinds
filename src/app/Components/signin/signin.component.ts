import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { credentials } from 'src/app/Models/Credentials';
import { TokenRegisterService } from 'src/app/Services/token-register.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  isLoggedIn = false;
  isLoginFailed = false;
  message: string = "";
  username: string = ""; 
  password: string = "";
  roles: string[] = [];
  errorMessage:string=""
  constructor(
    private service: UserService,
    private router: Router,
    private tokenstorage: TokenRegisterService 
  ) {}

  ngOnInit(): void {
    if (this.tokenstorage.getToken()) {
      this.roles = this.tokenstorage.getUser().roles;
    }
  }

  Signin(signinform: NgForm): void {
    let userCredentials:credentials={
      password:signinform.value.password,
      username:signinform.value.username
          }   
          
          this.service.signin(userCredentials).subscribe(
      (data: { accessToken: string }) => {
       this.tokenstorage.saveUser(data);
       this.tokenstorage.setLoggedInStatus(true);

       this.tokenstorage.saveToken(data.accessToken);
        this.isLoginFailed = true;
        this.isLoggedIn = true;
        this.roles = this.tokenstorage.getUser().roles;
        const user = this.tokenstorage.getUser();

        setTimeout(() => {
          if (user && user.roles && user.roles.includes('ADMIN')) {
            this.router.navigate(['/dashboard/users']);}
            if (user && user.roles && user.roles.includes('BASIC')) {
              this.router.navigate(['/profile']);}
             if (user && user.roles && user.roles.includes('TUTOR')) {
              this.router.navigate(['/tutorprofile']);} 
      
        }, 2000);
      },
      err => {
        this.errorMessage = "username or password is incorrect";
        console.log(this.errorMessage)
        this.isLoginFailed = true;
      }
    );
    this.tokenstorage.setLoggedInStatus(false);
  
  }

  
}
