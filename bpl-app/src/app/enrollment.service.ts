import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse,HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {

 private  _url='http://localhost:8080/v1/member/auth/signup';
  constructor(private _http: HttpClient) { 

  }
  enroll(user) {
    return this._http.post<any>(this._url,user);
  }
}
