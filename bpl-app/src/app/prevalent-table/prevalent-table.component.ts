import { Component, OnInit ,  ViewChild} from '@angular/core';
import {  MatPaginator  } from '@angular/material/paginator';
import {  MatSort } from '@angular/material/sort';
import {  MatTableDataSource  } from '@angular/material/table';
import { HttpClient, HttpResponse,HttpHeaders } from '@angular/common/http';
import { IProfile } from '../../shared/profile';
import { PlayerData } from '../../shared/playerData';
import { Router } from '@angular/router';
import { securityQuestion, passwordHint } from 'src/shared/registrationConstant';
import { getMatIconNameNotFoundError } from '@angular/material';
import { getLocaleFirstDayOfWeek } from '@angular/common';
import { Capability } from 'protractor';
import { state } from '@angular/animations';

// export interface UserData {
//   id: string;
//   name: string;
//   progress: string;
//   color: string;
// }

// /** Constants used to fill up our data base. */
// const COLORS: string[] = [
//   'maroon', 'red', 'orange', 'yellow', 'olive', 'green', 'purple', 'fuchsia', 'lime', 'teal',
//   'aqua', 'blue', 'navy', 'black', 'gray'
// ];
// const NAMES: string[] = [
//   'Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack', 'Charlotte', 'Theodore', 'Isla', 'Oliver',
//   'Isabella', 'Jasper', 'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'
// ];


@Component({
  selector: 'app-prevalent-table',
  templateUrl: './prevalent-table.component.html',
  styleUrls: ['./prevalent-table.component.css']
})
export class PrevalentTableComponent implements OnInit {

  private _url ='http://localhost:8080/v1/users';

  displayedColumns: string[]=['id','_pk_email_id','user_name','blood_group','gender','mobile_no','state','dob'];
  dataSource: MatTableDataSource<IProfile>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private _http: HttpClient, private _router:Router) {
  
  }

  ngOnInit() {
    this._http.get<IProfile[]>(this._url)
    .subscribe(data => {
    
      this.dataSource = new MatTableDataSource(data);

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

// function createNewUser(data): IProfile {
//   // const name = NAMES[Math.round(Math.random() * (NAMES.length - 1))] + ' ' +
//   //     NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) + '.';

//   return {
//     id: data.id.toString(),
//     _pk_email_id:data._pk_email_id.toString(),
//     user_name:data.user_name,
//     password:data.password,
//     security_question:data.security_question,
//     security_answer:data.security_answer,
//     blood_group:data.blood_group,
//     gender:data.gender,
//     mobile_no:data.mobile_no,
//     locality:data.locality,
//     city:data.city,
//     state:data.state,
//     player_name:data.player_name,
//     dob:data.dob,
//     // name: name,
//     // progress: Math.round(Math.random() * 100).toString(),
//     // color: COLORS[Math.round(Math.random() * (COLORS.length - 1))]
//   };
// }
