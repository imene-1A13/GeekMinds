import { Component, OnInit } from '@angular/core';
import { TokenRegisterService } from 'src/app/Services/token-register.service';
import { UserService } from 'src/app/Services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Import form-related modules
import { Speciality } from 'src/app/Models/speciality';
import { Country } from 'src/app/Models/country';
import { catchError } from 'rxjs';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any;
  usere=this.tokenstorage.getUser();
  userid=this.usere.idUser;
  countries: Country[] = []; 
course:any;
  specialities: Speciality[]=[];
  profileForm!: FormGroup; 
  isLoggedIn: boolean = false;
  // @ts-ignore
  User = JSON.parse(sessionStorage.getItem('auth-user'));
  imageUrl: string | null = null;

  selectedFile: File | undefined;
  uploadError: string | null = null;

  constructor(private http: HttpClient,private tokenstorage: TokenRegisterService,private userservice:UserService,    private fb: FormBuilder 
  ) {this.getCountries(),this.getSpecialities()}
  ngOnInit(): void {
  this.enrolledcourses();
    

    this.user = this.tokenstorage.getUser();
    
    this.tokenstorage.isLoggedIn$.subscribe((isLoggedIn: boolean) => {
      this.isLoggedIn = isLoggedIn;    });

    this.profileForm = this.fb.group({
      username: [this.user.username, Validators.required],
      lastName: [this.user.lastName, Validators.required],
      speciality: [this.user.speciality, Validators.required],
      phone: [this.user.phone, Validators.required],
      birthdate: [this.user.birthdate, Validators.required],
      country: [this.user.country, Validators.required],      // Add more form controls as needed
  
   
  });
  
}


  
  getCountries() {
    this.userservice.ListCountries().subscribe((data) => {
      this.countries = data;
      console.log('this is the list:', this.countries);
    });
  }
  
  getSpecialities() {
    this.userservice.ListSpeciality().subscribe((data) => {
      this.specialities = data;
      console.log('this is the list:', this.specialities);
    });
  }

  
  onFileSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      this.selectedFile = inputElement.files[0];
    }
  }
  uploadImage(): void {
    if (this.selectedFile) {
      this.uploadError = null; // Clear any previous error messages
      
      this.userservice.uploadImage(this.user.idUser, this.selectedFile)
        .pipe(
          catchError(error => {
            this.uploadError = 'Failed to upload picture. Please try again later.';
            return of(null); // Return an empty observable to avoid breaking the chain
          })
        )
        .subscribe(response => {
          if (response && response.success) {
            this.imageUrl = response.imageUrl;
          } else {
            // Handle error (if needed) or let the user know that the upload failed
            if (!this.uploadError) {
              this.uploadError = 'Failed to upload picture. Please try again later.';
            }
          }
        });
    }
  }
  
  updateUserProfile() {
    const iduser = this.user.idUser;
    const updatedUserData = this.profileForm.value; // Get the updated data from the form
    this.userservice.updateprofile(iduser, updatedUserData).subscribe(
      (response) => {
        const updatedUser = { ...this.user, ...updatedUserData };

        console.log('Profile updated successfully', response);
        sessionStorage.setItem('auth-user', JSON.stringify(updatedUser));
        this.user = updatedUser;
      },
      (error) => {
        console.error('Error updating profile', error);
      }
    );
  }
  
  listcourses:any;

  
  enrolledcourses()
  {
    const enrollUrl = `http://localhost:8095/courses/coursesenrolledin/${this.userid}`;

    this.http.post(enrollUrl, {}).subscribe(
      res => {
        this.listcourses = res;
      }
    );
  }


}