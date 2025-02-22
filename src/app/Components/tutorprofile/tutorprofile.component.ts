import { Component, OnInit } from '@angular/core';
import { TokenRegisterService } from 'src/app/Services/token-register.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from 'src/app/Models/Category';
import { CourseService } from 'src/app/Services/Courses.service';
import { Domain } from 'src/app/Models/Domain';
import { Course } from 'src/app/Models/Course';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tutorprofile',
  templateUrl: './tutorprofile.component.html',
  styleUrls: ['./tutorprofile.component.css']
})
export class TutorprofileComponent  implements OnInit{
  user: any; 
  public domainesLoaded: boolean = false;

  selectedFile!: File;
  listcourses:any;
  course: Course = {} as Course;
  isLoggedIn: boolean = false;
  imageUrl: string | null = null;
  uploadError: string | null = null;
  CourseForm: FormGroup; 
  categories:Category[]=[];
  public domaines: Domain[] = []; 
  // @ts-ignore
      User = JSON.parse(sessionStorage.getItem('auth-user'));
  usere = this.tokenstorage.getUser();
  userid=this.usere.idUser;
  uploadSucess: string | null = null;

  constructor(
   private tokenstorage:TokenRegisterService,
    private service: CourseService,
    private fb: FormBuilder
  ) {
    this.getdomains();
  this.getcategories();
  this.CourseForm = this.fb.group({
    // Define form controls here
    name: ['', Validators.required],
    description: ['what can the student learn', Validators.required],
    domain: ['', Validators.required],
    niveau: ['', Validators.required],
    price: ['', Validators.required],
    category: ['', Validators.required] ,
  duree:['Hours',Validators.required] });
  }
  
  
  
  
  ngOnInit(): void {
this.viewourses();

    this.user = this.tokenstorage.getUser();
    this.tokenstorage.isLoggedIn$.subscribe((isLoggedIn: boolean) => {
      this.isLoggedIn = isLoggedIn;    });
  
}

getcategories() {
  this.service.categories().subscribe((data) => {
    this.categories = data;
  });
}


getdomains() {
  this.service.domains().subscribe(
    (data) => {
      this.domaines = data;
      this.domainesLoaded = true; // Set the flag to true when data is loaded
    }
  );
}

addcourse() {
  const updatedUserData = this.CourseForm.value; // Get the updated data from the form

  // First, add the course data
  this.service.addcourse(updatedUserData, this.userid).subscribe(
    (courseResponse) => {
      console.log('Course added successfully', courseResponse);

      this.uploadimage(courseResponse.idc);


    },
    (error) => {
      console.error('Error adding course', error);
    }
  );
}

deletecourse(id:number)
{this.service.deletecourse(id).subscribe((Response)=>{
  console.log(Response);   
})}
alertConfirmation(id :number) {
  Swal.fire({
    title: 'Are you sure?',
    text: 'This process is irreversible.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, go ahead.',
    cancelButtonText: 'No, let me think',
  }).then((result) => {
    if (result.value) {
      this.deletecourse(id);

      Swal.fire('Removed!', 'Course was removed successfully.', 'success').then(() => {
        location.reload();
      });

    } else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire('Cancelled', 'Course still in our database.', 'error');
    }
  });
}



onFileSelected(event: Event): void {
  const inputElement = event.target as HTMLInputElement;
  if (inputElement.files && inputElement.files.length > 0) {
    this.selectedFile = inputElement.files[0];
  }
}


  uploadimage(courseid: number): void {
    if (this.selectedFile) {
      this.uploadSucess = null; // Clear any previous error messages
  
      // Now upload the CV using the user ID obtained from registration
      this.service.uploadImage(courseid, this.selectedFile).subscribe(
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
  
 
}

viewourses()
{this.service.Tutorcourses(this.userid).subscribe((res: Course[]) => {
  this.listcourses = res;
 
  });
}
}