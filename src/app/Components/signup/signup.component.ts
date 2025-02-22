import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Models/User';
import { UserService } from 'src/app/Services/user.service';
import { Country } from 'src/app/Models/country';
import { ERole } from 'src/app/Models/erole';
import { Speciality } from 'src/app/Models/speciality';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  selectedFile!: File;
  uploadSucess: string | null = null;
  emailValid: boolean = true;
  roles: ERole[] = [];
  specialities: Speciality[] = [];
  user: User = {} as User;
  countries: Country[] = [];
  url: string | null = null;
  invalidUsername=false;
  invalidLinkedIn = false;

  constructor(
    private service: UserService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.getCountries();
    this.getRoles();
    this.getSpecialities();
  }

  ngOnInit(): void {}
  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }
  validateUsername() {
    const usernameValue = this.user.username;
    this.invalidUsername = usernameValue.trim() === ''; // Check if the username is empty
  }
  
  validateLinkedIn() {
    const linkedInValue = this.user.linkedin;
    this.invalidLinkedIn = !linkedInValue.startsWith('https://www.linkedin.com/in/');
  }
  register(): void {
    // Perform user registration here, excluding CV
    this.service.Signup(this.user).subscribe(
      (response) => {

        console.log('User registered successfully:', response);
        
  
        
        this.uploadCV(response.idUser);


        this.router.navigate(['/signin']);
      },
      (error) => {
        if (error.status === 400) {
              
          if (error.error && error.error.message) {
          
            const errorMessage = error.error.message;
            alert(errorMessage);


          }
          else{          console.error('Generic error:', error);
        }

        
        }
              
              
              
              }
    );
  }
  

  steps = ['Account Setup', 'Personal Details', 'Other Details'];
  currentStep = 0;

  nextStep() {
    if (this.currentStep < this.steps.length - 1) {
      this.currentStep++;
    }
  }

  prevStep() {
    if (this.currentStep > 0) {
      this.currentStep--;
    }
  }

  isLastStep() {
    return this.currentStep === this.steps.length - 1;
  }

  isFirstStep() {
    return this.currentStep === 0;
  }

  getRoles() {
    this.service.ListRoles().subscribe((data) => {
      this.roles = data.filter(role => role === 'TUTOR' || role === 'BASIC');
      console.log('Roles:', this.roles);
    });
  }

  getCountries() {
    this.service.ListCountries().subscribe((data) => {
      this.countries = data;
      console.log('Countries:', this.countries);
    });
  }

  // Add a fieldTouched object to track whether a field has been touched
fieldTouched: any = {};

emailPatternValid: boolean = true;

validateField(fieldName: string): void {
  this.fieldTouched[fieldName] = true;

  if (fieldName === 'email') {
    this.emailPatternValid = this.validateEmailPattern();
  }
}

isFormValid(): boolean {
  // Check if all required fields are touched and valid
  const isEmailValid = this.fieldTouched.email && this.emailPatternValid;
  const isPasswordValid = this.fieldTouched.password && this.user.password && this.user.password.length >= 8;
  
  // Add similar checks for other fields in the current ngSwitch case
  const isLastNameValid = this.fieldTouched.lastName;
  const isUsernameValid = this.fieldTouched.username;
  const isPhoneValid = this.fieldTouched.phone;
  const isBirthdateValid = this.fieldTouched.birthdate;
  const isSexValid = this.fieldTouched.sex;
  const isCountryValid = this.fieldTouched.country;
  const isAddressValid = this.fieldTouched.address;
  const isSpecialityValid = this.fieldTouched.sepciality;
  const isRoleValid = this.fieldTouched.role;

  // Check if LinkedIn is required for the current ngSwitch case
  const isLinkedInValid = !this.invalidLinkedIn || !this.user.linkedin;

  // Check if CV is required for the current ngSwitch case
  const isCVValid = !this.selectedFile;

  // Combine all validation checks
  return (
    isEmailValid &&
    isPasswordValid &&
    isLastNameValid &&
    isUsernameValid &&
    isPhoneValid &&
    isBirthdateValid &&
    isSexValid &&
    isCountryValid &&
    isAddressValid &&
    isSpecialityValid &&
    isRoleValid &&
    isLinkedInValid &&
    isCVValid
  );
}

validateEmailPattern(): boolean {
  // Your email pattern validation logic
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailPattern.test(this.user.email);
}


  getSpecialities() {
    this.service.ListSpeciality().subscribe((data) => {
      this.specialities = data;
      console.log('Specialities:', this.specialities);
    });
  }
 
  
  

  uploadCV(userId: number): void {
    if (this.selectedFile) {
      this.uploadSucess = null; // Clear any previous error messages
  
      // Now upload the CV using the user ID obtained from registration
      this.service.uploadcv(userId, this.selectedFile).subscribe(
        (response) => {
          // Handle the response based on what your backend returns
          if (response) {
  
            // Redirect or perform any other actions upon successful CV upload
          } else {
            this.uploadSucess = 'Uploaded successfuly';
          }
        },
        
      );
    }
  
 
}}
