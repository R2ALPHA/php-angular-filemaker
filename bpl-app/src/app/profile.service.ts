import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse,HttpHeaders } from '@angular/common/http';
import {IProfile} from '../shared/profile';
import { Observable } from 'rxjs';
// import { Observable } from 'rxjs/Observable';

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

    this._url='http://localhost:8080/v1/member/'+email;
  //   this.profileData= this._http.get<any>(this._url,this.httpOptions);

  //   this._http.get(this._url)
    
  //   .subscribe((res:Response) => {
  //   console.log(res.headers);
  //   alert(res);
  //   // you can assign the value to any variable here
  // });

  // this.profileData=

   return this._http.get<IProfile[]>(this._url, this.httpOptions);

//   alert(this.profileData[0][0]);
// // alert(this.profileData[0]);
// // alert(this.profileData[1][1]);
// return this.profileData;
// console.log(this.profileData);
}
}
