import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { IProfile } from '../shared/profile';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  public profileData;
  private _url;
  public  user_name

  token = localStorage.getItem('token');
  headers = new HttpHeaders().set("Authorization", "Bearer " + this.token);
 
  constructor(private _http: HttpClient) { }

  getProfile(email): Observable<IProfile[]> {

    this._url = 'http://localhost:8080/v1/user/' + email;
    return this._http.get<IProfile[]>(this._url);
  }

  setProfileData(data) {
    this.profileData = data;
  }

  getProfileById(player_id) {
    this._url = 'http://localhost:8080/v1/user/id/' + player_id;
    return this._http.get<IProfile[]>(this._url);
  }
  getProfileData() {
    return this.profileData;
  }

  updateProfileData(updateFormData) {
    this._url= 'http://localhost:8080/v1/user';
    return this._http.put<any>(this._url,updateFormData);
  }
}
