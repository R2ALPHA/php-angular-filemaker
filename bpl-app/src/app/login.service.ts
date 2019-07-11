import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse,HttpHeaders } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
// import { userInfo } from 'os';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  isLoggedIn:boolean;
  emailId:String;
  private  _url='http://localhost:8080/v1/member/auth/login';
  constructor(private _http: HttpClient) {
    this.isLoggedIn=false;
   }

  login(user){
    this.emailId=user.user_name;
    return this._http.post<any>(this._url,user);
  }
}
