import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../../Services/user.service';
import Swal from 'sweetalert2';
import { from } from 'rxjs';
@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css']
})
export class ForgetpasswordComponent implements OnInit {
  email: string = '';
  sendedEmail = false;
  errorMessage = '';
  waiting = false;

  ngOnInit(): void {
    
    
  }

  constructor(private authService: UserService) {
  }

  onSubmit(forgetPwdForm: NgForm) {
   
      this.waiting = true;
  
      const email = this.email; // Get the email from the component's property
  
  
      setTimeout(() => {
        // After the delay, send the email request
        this.authService.Resetbyemail(email).subscribe(
          (data) => {
      
            this.waiting = false;
            this.sendedEmail = true;
            console.log('Resetbyemail function called with email:', email);
            console.log(data);
        
          },
          (err) => {
            this.waiting = false;
            this.sendedEmail = false;
            this.errorMessage = 'The written email is wrong';
          }
        );
      });
    } 
  }
  
  

