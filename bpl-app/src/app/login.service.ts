import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse,HttpHeaders } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
// import { userInfo } from 'os';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  isLoggedIn:boolean;
  private  _url='http://localhost:8080/v1/member/auth/login';
  constructor(private _http: HttpClient) {
   }


   /* Setting of token should also happen there */
   
  login(user){
    return this._http.post<any>(this._url,user);
  }

  logout() {
    localStorage.setItem('token', null);
    localStorage.setItem('expiry',null);
    localStorage.setItem('user_name',null);
  }
}
