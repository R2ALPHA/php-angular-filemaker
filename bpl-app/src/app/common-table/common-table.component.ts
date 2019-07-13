import { Component, OnInit } from '@angular/core';
import { state } from '@angular/animations';
import { HttpClient, HttpResponse,HttpHeaders } from '@angular/common/http';
import {IProfile} from '../../shared/profile';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-common-table',
  templateUrl: './common-table.component.html',
  styleUrls: ['./common-table.component.css']
})
export class CommonTableComponent implements OnInit {

  public datasource=[];

  private _url ='http://localhost:8080/v1/users';
  
  constructor(private _http: HttpClient, private _router:Router) { }

  ngOnInit() {

    this._http.get<IProfile[]>(this._url)
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
