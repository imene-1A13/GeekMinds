import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from 'src/app/Services/Courses.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-chapters',
  templateUrl: './chapters.component.html',
  styleUrls: ['./chapters.component.css']
})

export class ChaptersComponent implements OnInit {
  ChapterForm: FormGroup; 
  AssignementForm:FormGroup;


  constructor(private route: ActivatedRoute, private service: CourseService,    private fb: FormBuilder) { 
    this.ChapterForm = this.fb.group({
      title: ['', Validators.required],
      details: ['', Validators.required],});
                  // Examform

      this.AssignementForm = this.fb.group({
        title: ['', Validators.required],});
                         

    
            
          
  }
      course: any;
      chapters:any;
      selectedModel: string | null = null;
      selectedFile!: File;
      selected!: File;
      uploadSucess: string | null = null;



  showToDoModel() {
    this.selectedModel = 'todo';
  }

  showAddChapterModel() {
    this.selectedModel = 'add-chapter';
  }
  showAddModel() {
    this.selectedModel = 'add-exam';
  }
  ngOnInit(): void {
    const coursename = this.route.snapshot.paramMap.get('coursename');
    if (coursename !== null) {
      console.log('Course Name:', coursename); // Add this line for debugging
      this.view(coursename);
      this.chap(coursename);

    }

  }
 

  view(corse:string)
  { this.service.getcourse(corse).subscribe((data) => {
    console.log("this is the list",data);
    this.course = data; 
  });}
  chap(course:string)
  {this.service.getchapters(course).subscribe((data) => {
    this.chapters = data; 
  });}

  addChapter() {
    const updatedUserData = this.ChapterForm.value; // Get the updated data from the form
   // First, add the course data
   this.service.addchapter(updatedUserData, this.course.name).subscribe(
    (Response) => {
      console.log('Chapter added successfully', Response);

      this.uploadcontent(Response.idch);
      setTimeout(() => {
        this.uploadvideo(Response.idch);
      }, 1000);



    },
    (error) => {
      console.error('Error adding course', error);
    }
  );

    
  }

  addassign() {
    const updatedUserData = this.AssignementForm.value; // Get the updated data from the form
   this.service.addassign(updatedUserData, this.course.name).subscribe(
    (Response) => {

      this.uploadpdf(Response.idq);
      



    },
    (error) => {
      console.error('Error adding course', error);
    }
  );

    
  }
    
    
  
 
   
    


  
    
    
    
    
    
    
    




  deletechapter(id:number)
  {this.service.deletechapter(id).subscribe((Response)=>{
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
        this.deletechapter(id);
  
        Swal.fire('Removed!', 'Chapter was removed successfully.', 'success').then(() => {
          location.reload();
        });
  
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'Chapter still in our database.', 'error');
      }
    });
  }



onFileSelected(event: Event): void {
  const inputElement = event.target as HTMLInputElement;
  if (inputElement.files && inputElement.files.length > 0) {
    this.selectedFile = inputElement.files[0];
  }
}
onFilecontentSelected(event: Event): void {
  const inputElement = event.target as HTMLInputElement;
  if (inputElement.files && inputElement.files.length > 0) {
    this.selected = inputElement.files[0];
  }
}
uploadvideo(courseid: number): void {
  if (this.selectedFile) {
    this.uploadSucess = null; 

    this.service.uploadvideo(courseid, this.selectedFile).subscribe(
      (response) => {
        if (response) {

        } else {
          this.uploadSucess = 'Uploaded successfuly';
        }
      },
      
    );
  }}

  uploadpdf(courseid: number): void {
    if (this.selected) {
      this.uploadSucess = null; 
  
      this.service.uploadpdf(courseid, this.selected).subscribe(
        (response) => {
          if (response) {
  
          } else {
            this.uploadSucess = 'Uploaded successfuly';
          }
        },
        
      );
    }
}
  uploadcontent(courseid: number): void {
    if (this.selected) {
      this.uploadSucess = null; 
  
      this.service.uploadcontent(courseid, this.selected).subscribe(
        (response) => {
          if (response) {
  
          } else {
            this.uploadSucess = 'Uploaded successfuly';
          }
        },
        
      );
    }
}








}

