import { Component, OnInit ,  ViewChild, HostListener} from '@angular/core';
import {  MatPaginator  } from '@angular/material/paginator';
import {  MatSort } from '@angular/material/sort';
import {  MatTableDataSource  } from '@angular/material/table';
import { HttpClient, HttpResponse,HttpHeaders } from '@angular/common/http';
import { IProfile } from '../../shared/profile';
import { Router } from '@angular/router';

@Component({
  selector: 'app-prevalent-table',
  templateUrl: './prevalent-table.component.html',
  styleUrls: ['./prevalent-table.component.scss']
})
export class PrevalentTableComponent implements OnInit {

  private _url ='http://localhost:8080/v1/users';

  display:boolean = true;
  displayedColumns: string[]=['id','_pk_email_id','user_name','blood_group','gender','state','dob'];
  dataSource: MatTableDataSource<IProfile>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @HostListener('window:scroll', ['$event']) onScrollEvent($event){
    console.log($event);
    console.log("scrolling");
    // this.getPosition();
  } 

  constructor(private _http: HttpClient, private _router:Router) {
  
  }

  ngOnInit() {
    this._http.get<IProfile[]>(this._url)
    .subscribe(data => {
    
      this.dataSource = new MatTableDataSource(data);

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    this.getPosition();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

//get the top offset of the header
//get the top offset of the row
//based on the conclusion
//sent the display propery to display : none;
// have an window listener property that will listen to the scroll

getPosition()
{
//get the to offset of the table header ..
 let  headerOffset = document.getElementById("thead");
 let headerTop = headerOffset.offsetTop

 alert(headerTop);
 var rowoffset = document.getElementById("trow");
 alert(rowoffset.offsetTop);
 let rowTop =rowoffset.offsetTop


 {
   this.display=false;
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
