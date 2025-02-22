import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from 'src/app/Services/Courses.service';
import { TokenRegisterService } from 'src/app/Services/token-register.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-payement',
  templateUrl: './payement.component.html',
  styleUrls: ['./payement.component.css']
})
export class PayementComponent implements OnInit {
  constructor(private tokenstorage:TokenRegisterService,private route: ActivatedRoute, private service: CourseService,private sanitizer: DomSanitizer,private http: HttpClient) {}
  usere = this.tokenstorage.getUser();
  userid=this.usere.idUser;
  ngOnInit(): void {
   
  }
  coursename = this.route.snapshot.paramMap.get('coursename');
  
  chargeCreditCard() {
    let form = document.getElementsByTagName("form")[0];
    (<any>window).Stripe.card.createToken({
      number: form['cardNumber'].value,
      exp_month: form['expMonth'].value,
      exp_year: form['expYear'].value,
      cvc: form['cvc'].value
    }, (status: number, response: any) => {
      if (status === 200) {
        let token = response.id;
        this.chargeCard(token);
      } else {
        console.log(response.error.message);
      }
    });
  }

  enrollInCourse(courseId: string): void {
    const enrollUrl = `http://localhost:8095/courses/enroll/${this.userid}/${this.coursename}`;

    this.http.post(enrollUrl, {}).subscribe(
      response => {
        console.log('Enrollment successful', response);
      },
      error => {
        console.error('Enrollment failed', error);
      }
    );
  }

chargeCard(token: string) {
    const headers = new HttpHeaders({'token': token, 'amount': '100'});
  
    this.http.post('http://localhost:8095/courses/charge', {}, { headers: headers })
      .subscribe(resp => {
        this.enrollInCourse;
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'You are now enrolled'
        });
      
      },
      );
      }
  }

    
