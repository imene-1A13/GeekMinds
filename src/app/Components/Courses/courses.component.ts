import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/Models/Course';
import { CourseService } from 'src/app/Services/Courses.service';
import { TokenRegisterService } from 'src/app/Services/token-register.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  courses: Course[] = [];
  keyword:string="";
listcourses:any;
  constructor(private service :CourseService,private tokenstorage:TokenRegisterService,private http:HttpClient){}
  usere = this.tokenstorage.getUser();
  userid=this.usere.idUser;
  ngOnInit(): void {
    this. getAllCourses();  

  }
  getAllCourses() {
    this.service.getallcourses().subscribe((res: Course[]) => {
      this.listcourses = res;
     
      });
    }

    calculateStarRating(course: Course): { fullStars: number, halfStar: boolean } {
      if (course.ratetotal >= 0 && course.ratetotal <= 5) {
        const fullStars = Math.floor(course.ratetotal);
        const halfStar = course.ratetotal % 1 !== 0;
        return { fullStars, halfStar };
      } else {
        return { fullStars: 0, halfStar: false }; // Invalid rating
      }
    }
    enrollInCourse(co: string): void {
      const enrollUrl = `http://localhost:8095/courses/enroll/${this.userid}/${co}`;
  
      this.http.post(enrollUrl, {}).subscribe(
        response => {
          console.log('Enrollment successful', response);
        },
        error => {
          console.error('Enrollment failed', error);
        }
      );
    }

    onSearch(cr: string) {
      if (this.keyword=cr) {
        this.service.searchCoursebyname(cr).subscribe(course => {
          this.courses = course;
        });
      } else {
        this.service.getallcourses().subscribe(course => {
          this.courses = course;
        });
      }
    }
    



}
