import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IProfile } from '../shared/profile';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  public profileData;
  private _url ;
  private token=localStorage.getItem('token');
  
  constructor(private _http: HttpClient) { }

  getProfile(email):Observable<IProfile[]> {

    this._url='http://localhost:8080/v1/user/'+email;
   
   return this._http.get<IProfile[]>(this._url);
  }
}
