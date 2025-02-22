import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Chapters } from 'src/app/Models/Chapters';
import { Rate } from 'src/app/Models/Rate';
import { CourseService } from 'src/app/Services/Courses.service';

@Component({
  selector: 'app-coursedetails',
  templateUrl: './coursedetails.component.html',
  styleUrls: ['./coursedetails.component.css']
})
export class CoursedetailsComponent implements OnInit {
  goToNextChapter() {
    if (this.currentChapter < this.chapters.length - 1) {
      this.currentChapter++;
    }
  }
  currentRating: number = 0;

  
  constructor(private route: ActivatedRoute, private service: CourseService,private sanitizer: DomSanitizer,private http: HttpClient) { }
      course: any;
      chapter: Chapters[] = [
        {
         
          idch:0,
          title:"",
          content: "",
          video:"",
          details:"",
          completed:false,
        },];
        chapterCompleted: boolean[] = Array(this.chapter.length).fill(false);

      chapters:any;

      currentChapter: number = 0; 
  ngOnInit(): void {
    const coursename = this.route.snapshot.paramMap.get('coursename');
    if(coursename!==null){
      this.view(coursename);
      this.addchap(coursename);
    }
  
    

  }
   

  view(corse:string)
  { this.service.getcourse(corse).subscribe((data) => {
    console.log("this is the list",data);
    this.course = data; // Store the fetched course details in the 'course' variable
  });}


  addchap(course:string)
  {this.service.getchapters(course).subscribe((data) => {
    this.chapters = data; // Store the fetched course details in the 'course' variable
  });}


  rateCourse(rating: number) {
    this.currentRating = rating;

    const courseId = this.course.idc;

    const rate: Rate = {
      number: rating
    };

    this.http.post<Rate>(`http://localhost:8095/courses/${courseId}/ratings`, rate)
      .subscribe(
        (response) => {
          // Handle success, maybe update UI or show a message
          console.log('Rating added successfully:', response);
        },
        (error) => {
          // Handle error, show error message, etc.
          console.error('Error adding rating:', error);
        }
      );
  }
  
}

