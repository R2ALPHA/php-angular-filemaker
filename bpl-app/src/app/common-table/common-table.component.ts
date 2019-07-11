import { Component, OnInit } from '@angular/core';
import { state } from '@angular/animations';
import { HttpClient, HttpResponse,HttpHeaders } from '@angular/common/http';
import {IProfile} from '../../shared/profile';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-common-table',
  templateUrl: './common-table.component.html',
  styleUrls: ['./common-table.component.css']
})
export class CommonTableComponent implements OnInit {

  public datasource=[];

  private _url ='http://localhost:8080/v1/users';

  private token=localStorage.getItem('token');
  
  constructor(private _http: HttpClient) { }

  private headers_object = new HttpHeaders().set("Authorization", "Bearer " + this.token);
  httpOptions = {
      headers: this.headers_object
  };

  ngOnInit() {
    this._http.get<IProfile[]>(this._url, this.httpOptions)
    .subscribe(data => {this.datasource = data
    });
  }

  settings = {
    columns :{
      id: {
        title:"id"
      },
    _pk_email_id:{
      title:"Email"
    },
    user_name: {
      title: "User Name"
    },
    security_question :{
      title: "Security Question"
    },
    security_answer :{
      title: "Security Answer"
    },
    blood_group :{
      title: "blood-group"
    },
    gender :{
      title: "gender"
    },
    mobile_no:{
      title: "Mobile No."
    },
    alt_mob_no:{
      title:"Alternat No."
    },
    locality:{
      title: "locality"
    },
    city: {
      title: "city"
    },
    state :{
      title: "state"
    },
    dob: {
      title: "dob"
    }
  }
}
}
