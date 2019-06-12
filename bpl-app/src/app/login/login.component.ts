import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user={remember:false};

  constructor() { }

  ngOnInit() {
    console.log("User: ", this.user);
  }
  onSubmit() {
    console.log("User: ", this.user);
  }
}
