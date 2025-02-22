import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResetRequest } from 'src/app/Models/ResetRequest';
import { UserService } from 'src/app/Services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {
  password: string = ''; 
  passwordrpt: string = ''; 
  token: string="";
  mail:string="";
  resetPassword: ResetRequest | null = null; // Initialize it to null

  same=true;
  updated=false;
  
  constructor(private route: ActivatedRoute , private authService: UserService, private router:Router) {

   
  }
  ngOnInit(): void {
    if (this.authService.formModal) {
      this.authService.formModal.show();
    }

    this.route.queryParams.subscribe((params) => {
      console.log(params);
      this.token = params['token'];
      console.log(this.token);
    });
  }

  onSubmit() {
    this.updated = false;

    if (this.password == this.passwordrpt) {
      this.same = true;

      // Cast an object literal to ResetRequest
      this.resetPassword = {
        mail: localStorage.getItem('mail'),
        token: this.token,
        password: this.password
      };

      console.log(this.resetPassword);
      this.authService.reset_password(this.resetPassword).subscribe(
        
       
        (data) => {
          Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'Password updated successfully.'
          });
          if (data && typeof data === 'string' && data.includes('Password updated successfully')) {
           
            this.updated = true;
          } 
        },
        (err: any) => {
          this.updated = false;
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'Cannot reset password'
          });
          console.error(err);
        }
      );
    } else {
      this.same = false;
    }
  }

  
}

