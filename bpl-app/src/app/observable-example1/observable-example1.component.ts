import { Component, OnInit } from '@angular/core';
import { ObservableService } from '../observable.service';

@Component({
  selector: 'app-observable-example1',
  templateUrl: './observable-example1.component.html',
  styleUrls: ['./observable-example1.component.css']
})
export class ObservableExample1Component implements OnInit {

  constructor(
    private _observableService: ObservableService
  ) {

    this._observableService.userName
      .subscribe(
        uname => {
          this.userName = uname;
        });
  }

  userName: string = "Gourav";

  ngOnInit() {
  }

  updateUserName(uname) {

    // this.userName = uname.value;
    this._observableService.userName.next(uname.value);
  }
}
