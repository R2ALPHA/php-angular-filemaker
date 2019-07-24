
import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {Observable} from 'rxjs';

import { Country } from '../../shared/country';
import { ITask } from '../../shared/task';
import { CountryService } from '../country.service';
import { NgbdSortableHeader, SortEvent } from '../../shared/sortable.directive';

@Component({
  selector: 'app-all-tasks',
  templateUrl: './all-tasks.component.html',
  styleUrls: ['./all-tasks.component.css']
})
export class AllTasksComponent implements OnInit {

  countries$: Observable<Country[]>;
  total$: Observable<number>;

  // tsks$:Observable<ITask[]>;
  //total$ from  above

  ngOnInit() {

  }

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  constructor(public service: CountryService) {
    this.countries$ = service.countries$;
    this.total$ = service.total$;
  }

  // constructor(public service: ActivityService) {
  //   this.tsks$ = service.countries$;
  //   this.total$ = service.total$;
  // }

  onSort({column, direction}: SortEvent) {
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    //Todo sort functionality not working by now
    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }

}
