import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AdminLoginService {

  private  _url='http://localhost:8080/v1/admin/login';
  constructor(private _http: HttpClient) { 

  }

  getLoginResponse(adminData){
    
    return this._http.post<any>(this._url,adminData);
  }
}

