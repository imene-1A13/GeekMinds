import { NgModule } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import { AppComponent } from './app.component';
import { HeaderComponent } from './Components/header/header.component';
import { FeaterComponent } from './Components/footer/feater.component';
import { HomeComponent } from './Components/home/home.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { SigninComponent } from './Components/signin/signin.component';
import { SignupComponent } from './Components/signup/signup.component';
import {  HttpClientModule } from '@angular/common/http';
import { ProfileComponent } from './Components/profile/profile.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { NotfoundComponent } from './Components/notfound/notfound.component';
import { SidebarComponent } from './Components/sidebar/sidebar.component';
import { SidebarDashboardComponent } from './Components/sidebar-dashboard/sidebar-dashboard.component';
import { ForgetpasswordComponent } from './Components/forgetpassword/forgetpassword.component';
import { HeaderlogoutComponent } from './Components/headerlogout/headerlogout.component';
import { ResetpasswordComponent } from './Components/resetpassword/resetpassword.component';
import{NgxExtendedPdfViewerModule}from'ngx-extended-pdf-viewer'
import { ReclamationsComponent } from './Components/reclamations/reclamations.component';
import { DashboardmainComponent } from './Components/dashboardmain/dashboardmain.component';
import { ListuserComponent } from './Components/listuser/listuser.component';import { CoursesComponent } from './Components/Courses/courses.component';
import { SearchComponent } from './Components/search/search.component';
import { CoursedetailsComponent } from './Components/coursedetails/coursedetails.component';
import { ChaptersComponent } from './Components/chapters/chapters.component';
import { TutorprofileComponent } from './Components/tutorprofile/tutorprofile.component';
import { PayementComponent } from './Components/payement/payement.component';
@NgModule({

  declarations: [
    AppComponent,
    HeaderComponent,
    FeaterComponent,
    HomeComponent,
    SigninComponent,
    SignupComponent,
    ProfileComponent,
    DashboardComponent,
    NotfoundComponent,
    SidebarComponent,
  SidebarDashboardComponent,
  ForgetpasswordComponent,
  HeaderlogoutComponent,
  ResetpasswordComponent,
  ReclamationsComponent,
  DashboardmainComponent,
  ListuserComponent,
  CoursesComponent,
  SearchComponent,
  TutorprofileComponent,
  CoursedetailsComponent,
  ChaptersComponent,
  PayementComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserModule,
    HttpClientModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgxExtendedPdfViewerModule,

    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
