import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse,HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {

 private  _url='http://localhost:8080/v1/user';
 private token ="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1NjA0NzkxNjksImV4cCI6MTU2MDQ5MzU2OSwianRpIjoiYWdTMjUwVjk0bllHQ0I3VmhjZERUIn0.FYahAQtXIkAF6TSGI9ybt5p3apaf7Z9phfFk1zROUOs";
 
 private headers_object = new HttpHeaders().set("Authorization", "Bearer " + this.token);
  httpOptions = {
      headers: this.headers_object
 };
  constructor(private _http: HttpClient) { 

  }

  enroll(user) {
    return this._http.post<any>(this._url,user,this.httpOptions);
  }
}
