import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse,HttpHeaders } from '@angular/common/http';
import {IProfile} from '../shared/profile';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  public profileData;
  private _url ;
  private token=localStorage.getItem('token');
  
  constructor(private _http: HttpClient) { }

  private headers_object = new HttpHeaders().set("Authorization", "Bearer " + this.token);
  httpOptions = {
      headers: this.headers_object
  };

  display(email):Observable<IProfile[]> {

    this._url='http://localhost:8080/v1/user/'+email;
    // this._url='http://localhost:8080/v1/users';

   return this._http.get<IProfile[]>(this._url, this.httpOptions);
  }
}
