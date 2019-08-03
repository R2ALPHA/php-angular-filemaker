import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { IProfile } from '../../../shared/interfaces/profile';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-player',
  templateUrl: './all-player.component.html',
  styleUrls: ['./all-player.component.scss']
})
export class AllPlayerComponent implements OnInit {
  private _url = 'http://localhost:8080/v1/users';

  display: boolean = true;
  displayedColumns: string[] = ['id', '_pk_email_id', 'user_name', 'blood_group', 'gender', 'state', 'dob'];
  dataSource: MatTableDataSource<IProfile>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  @HostListener('window:scroll', ['$event']) onScrollEvent($event) {
    console.log($event);
    console.log("scrolling");
  }

  constructor(private _http: HttpClient, private _router: Router) { }

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

  getPosition() {

    let headerOffset = document.getElementById("thead");
    let headerTop = headerOffset.offsetTop;
    var rowoffset = document.getElementById("trow");
    alert(rowoffset.offsetTop);
    let rowTop = rowoffset.offsetTop
    {
      this.display = false;
    }
  }
}
