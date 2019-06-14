import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse,HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  public profileData;
  private _url;
  private token=localStorage.getItem('token');
  constructor(private _http: HttpClient) { }

  private headers_object = new HttpHeaders().set("Authorization", "Bearer " + this.token);
  httpOptions = {
      headers: this.headers_object
  };

  display(email) {
    alert(this.profileData.record);
  }
}
