import { Component, OnInit } from '@angular/core';
import { ObservableService } from '../observable.service';

@Component({
  selector: 'app-observable-example2',
  templateUrl: './observable-example2.component.html',
  styleUrls: ['./observable-example2.component.css']
})
export class ObservableExample2Component implements OnInit {

  constructor(
    private _observableService: ObservableService
  ) {

    this._observableService.userName
      .subscribe(
        uname => {
          this.userName = uname;
        });
  }

  
  userName:string = "Gourav";
  ngOnInit() {
  }

  updateUserName(uname) {

    this._observableService.userName.next(uname.value);
  }
}
