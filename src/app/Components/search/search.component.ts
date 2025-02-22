import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Course } from 'src/app/Models/Course';
import { CourseService } from 'src/app/Services/Courses.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  public: Course[] =[];
  searchKeyword: string = '';
  @Output() searchEvent = new EventEmitter<string>();


  constructor(private service: CourseService) { }

  ngOnInit(): void {}
  search() {
    this.service.searchCoursebyname(this.searchKeyword).subscribe(courses => {
      this.public = courses;
      this.searchEvent.emit(this.searchKeyword);
   });
   
  }
  
}
