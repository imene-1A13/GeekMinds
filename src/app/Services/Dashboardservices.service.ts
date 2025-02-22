import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, throwError } from "rxjs";
import { Reclamation } from "../Models/Reclamation";
import { Urls } from "../HttpClientUrls/Urls";
import { User } from "../Models/User";
import { Demande } from "../Models/Demande";@Injectable({
  providedIn: 'root'
})
export class DashboardServices {
  constructor(private httpClient:HttpClient) { }

listreclamation():Observable<Reclamation[]>
{return this.httpClient.get<Reclamation[]>(Urls.ReclamationList);}

deletereclamation(id: number): Observable<any> {
  if (id === undefined || isNaN(id)) {
    console.error("Invalid or undefined id:", id);
    return throwError("Invalid id");
  }

  const url = Urls.Deletereclam.replace('{{Id}}', id.toString());

  return this.httpClient.delete(url).pipe(
    catchError((error: any) => {
      console.error("Error occurred:", error);
      return throwError("An error occurred while deleting the record.");
    })
  );
}
ListUsers():Observable<User[]>
{return this.httpClient.get<User[]>(Urls.Listusers);}

getalldemands(): Observable<Demande[]> {
  const url = `${Urls.ListDemands}`;

  return this.httpClient.get<Demande[]>(url);
 }


 deleteuser(iduser: number): Observable<any> {
  const url = `${Urls.Deleteuser.replace('${iduser}', iduser.toString())}`;
  return this.httpClient.delete(url);
}
addadmin(user:User):Observable<User>
{const url = `${Urls.ADDadmin}`;
  return this.httpClient.post<User>(url,user);}

demandstatus(idc: number): Observable<boolean> {
  const url = `${Urls.Demandstatus}?idc=${idc}`;
  return this.httpClient.get<boolean>(url);
}


deletedemand(id:number) : Observable<any>{
  const url = `${Urls.Deletedemand}?id=${id}`;

  return this.httpClient.delete<boolean>(url);
 }

Deny(id: number): Observable<any> {
  const url = `${Urls.Deny.replace('${id}', id.toString())}`;
  return this.httpClient.get(url);
}

Accept(id: number): Observable<any> {
  const url = `${Urls.Accept.replace('${id}', id.toString())}`;
  return this.httpClient.get(url);
}
Downloadcv(id: number): Observable<any> {
  const url = `${Urls.Downloadcv.replace('${userId}', id.toString())}`;
  return this.httpClient.get(url,  {responseType: 'blob' });
}
 

}