import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, tap, throwError } from 'rxjs';
import { Urls } from '../HttpClientUrls/Urls';
import { Course } from '../Models/Course';
import { Category } from '../Models/Category';
import { Domain } from '../Models/Domain';
import { Chapters } from '../Models/Chapters';
import { Assignement } from '../Models/Assignement';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class CourseService {
 
  formModal: any;



  constructor(private httpClient: HttpClient) { }


  getcourse(corse: string): Observable<Course> {
    const url = `${Urls.getcourse.replace('${name}', corse)}`;

    return this.httpClient.get<Course>(url);
  }
 getchapters(idcourse:string):Observable<Chapters[]>
 { const url = `${Urls.chapters.replace('${name}', idcourse.toString())}`;

return this.httpClient.get<Chapters[]>(url)}

  addcourse(course:Course,iduser:number):Observable<Course>
  {  const url = `${Urls.AddCourse.replace('${iduser}', iduser.toString())}`;

return this.httpClient.post<Course>(url,course);}



generatecertif()
{

  
}


  getallcourses(): Observable<Course[]> {
    return this.httpClient.get<Course[]>(Urls.ViewCourses);
  }

  categories(): Observable<Category[]> { return this.httpClient.get<Category[]>(Urls.Categ); }
  domains(): Observable<Domain[]> { return this.httpClient.get<Domain[]>(Urls.Domains); }




  searchCoursebyname(name: any): Observable<any> {
    const url = `${Urls.getcoursebyname.replace('${name}', name)}`;
    return this.httpClient.get(url);
  }

  uploadImage(courseid: number, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file, file.name);
    formData.append('courseid', courseid.toString());
  
    const headers = new HttpHeaders();

  
    const uploadUrl = Urls.uploadimagetocourse(courseid);
  
    return this.httpClient.post(uploadUrl, formData, { headers });
  }
  
  Tutorcourses(IdUser:number): Observable<Course[]> { 
    const url = `${Urls.TutorCourses.replace('${IdUser}', IdUser.toString())}`;
    return this.httpClient.get<Course[]>(url); }


    
    addchapter(Chapter:any,courseId:string): Observable<Chapters> {
      const url = `${Urls.AddChapters.replace('${courseId}', courseId)}`;

      return this.httpClient.post<Chapters>(url,Chapter);
    }
    
   
      deletechapter(chapterId:number)
      {         const url =`${Urls.DeleteChapters.replace('${chapterId}',chapterId.toString())}`;
      return this.httpClient.delete<boolean>(url);

    }

    deletecourse(courseid:number)
    {         const url =`${Urls.DeleteCourse.replace('${Id}',courseid.toString())}`;
    return this.httpClient.delete<boolean>(url);

  }

    uploadcontent(id: number, file: File): Observable<any> {
      const formData = new FormData();
      formData.append('file', file, file.name);
      formData.append('id', id.toString());
    
      const headers = new HttpHeaders();
  
    
      const uploadUrl = Urls.addcontent(id);
    
      return this.httpClient.post(uploadUrl, formData, { headers });
    }
    uploadvideo(id: number, file: File): Observable<any> {
      const formData = new FormData();
      formData.append('file', file, file.name);
      formData.append('id', id.toString());
    
      const headers = new HttpHeaders();
  
    
      const uploadUrl = Urls.addvideo(id);
    
      return this.httpClient.post(uploadUrl, formData, { headers });
    }
    uploadpdf(id: number, file: File): Observable<any> {
      const formData = new FormData();
      formData.append('file', file, file.name);
      formData.append('id', id.toString());
    
      const headers = new HttpHeaders();
  
    
      const uploadUrl = Urls.addpdftoassign(id);
    
      return this.httpClient.post(uploadUrl, formData, { headers });
    }
    addassign(assignement:any,courseId:string): Observable<Assignement> {
      const url = `${Urls.addassign.replace('${idCourse}', courseId)}`;

      return this.httpClient.post<Assignement>(url,assignement);
    }
    
    getassign(courseid:string):Observable<Assignement>
    { const url = `${Urls.getassign.replace('${courseid}', courseid.toString())}`;
   
   return this.httpClient.get<Assignement>(url)}
    



    }