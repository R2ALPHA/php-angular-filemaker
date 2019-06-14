import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse,HttpHeaders } from '@angular/common/http';
import { LoginComponent } from './login/login.component';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  isLoggedIn:boolean;
  private  _url='http://localhost:8080/v1/member';
  constructor(private _http: HttpClient) {
    this.isLoggedIn=false;
   }

  login(user){
    return this._http.post<any>(this._url,user);
  }
}
