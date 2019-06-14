import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse,HttpHeaders } from '@angular/common/http';
import { User }       from './user';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {

 private  _url='http://localhost:8080/v1/user';
 private token ="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1NjA0MzE3NTYsImV4cCI6MTU2MDQzNTM1NiwianRpIjoiN1ZBa2Q0VnFQaFpKbWo3Q0pvZDhHaSJ9.HbtTWh7YJuS2f_kL9xVWL11xVQsEEz1aFNFCApQtMbo";
 
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
