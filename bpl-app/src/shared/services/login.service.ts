import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private _url = 'http://localhost:8080/v1/member/auth/login';

  isLoggedIn :boolean = false;

  constructor(
    private _http: HttpClient) {
  }

  /* Setting of token should also happen there */

  login(user:String) {
    return this._http.post<any>(this._url, user);
  }

  logout() {
    localStorage.clear();
  }

  setIsLoggedin(isLogin):void {
    this.isLoggedIn = isLogin;
  }

  getIsLoggedIn():boolean {

   return this.isLoggedIn;
  }
}
