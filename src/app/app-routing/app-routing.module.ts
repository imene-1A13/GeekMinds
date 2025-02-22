import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from '../Components/home/home.component';
import {SigninComponent} from '../Components/signin/signin.component';
import {SignupComponent} from '../Components/signup/signup.component';
import {ProfileComponent} from '../Components/profile/profile.component';
import {DashboardComponent} from '../Components/dashboard/dashboard.component';
import {NotfoundComponent} from '../Components/notfound/notfound.component';
import {ForgetpasswordComponent} from '../Components/forgetpassword/forgetpassword.component';
import { ResetpasswordComponent } from '../Components/resetpassword/resetpassword.component';
import { ReclamationsComponent } from '../Components/reclamations/reclamations.component';
import { DashboardmainComponent } from '../Components/dashboardmain/dashboardmain.component';
import { ListuserComponent } from '../Components/listuser/listuser.component';
import {CoursesComponent} from '../Components/Courses/courses.component';
import { TutorprofileComponent } from '../Components/tutorprofile/tutorprofile.component';
import { CoursedetailsComponent } from '../Components/coursedetails/coursedetails.component';
import { ChaptersComponent } from '../Components/chapters/chapters.component';
import { BlockedGuard } from '../Guards/blocked.guard';
import { PayementComponent } from '../Components/payement/payement.component';


const routes: Routes = [
  {path: '', component: HomeComponent, pathMatch: 'full'}
  
  ,
  {path: 'signup', component: SignupComponent},
  {path: 'pay/:coursename', component: PayementComponent},
  

  {path: 'signin', component: SigninComponent,canActivate: [BlockedGuard]},
  { path: 'tutorprofile/add-details/:coursename', component: ChaptersComponent},


  {path: 'home', component: HomeComponent},
  {
    path: 'tutorprofile',
    component: TutorprofileComponent},
  { path: 'courses-details/:coursename', component: CoursedetailsComponent },


  {path: 'profile', component: ProfileComponent ,canActivate: [BlockedGuard]},
  { path: 'courses', component: CoursesComponent },

  { 
    path: 'dashboard', 
    component: DashboardComponent,
    children: [
      { path: '', component: DashboardmainComponent },


      { path: 'reclamations', component: ReclamationsComponent },
      { path: 'users', component: ListuserComponent },

    ]
  },
  {path: 'forgot-password', component: ForgetpasswordComponent},
  {
    path: 'reset-password', component: ResetpasswordComponent, 
  },
  {path: '**', component: NotfoundComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule {
}
