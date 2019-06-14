import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse,HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private  _url='http://localhost:8080/v1/member';
  constructor(private _http: HttpClient) { }

  login(user){
    return this._http.post<any>(this._url,user);
  }
}
