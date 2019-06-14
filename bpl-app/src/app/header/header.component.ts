import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { LoginComponent } from '../login/login.component'
import { LoginService } from '../login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor( private _loginService: LoginService) { }

  private token=localStorage.getItem('token');
  private hidden;

  ngOnInit() {
  }

  isLogin() {

    if(this.token!==null)
      return false;
    else
      return true;
  }

  logOut() {
    localStorage.setItem("token",null);
    localStorage.setItem("expiry",null);
    this._loginService.isLoggedIn=false;
  }

}
