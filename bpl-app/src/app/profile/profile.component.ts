import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { ProfileService } from '../profile.service';
import { MatLineSetter, MAT_BOTTOM_SHEET_DATA } from '@angular/material';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public profileData;
  public profile=[];
  
  constructor(
    private _profileService:ProfileService,
    private _loginService: LoginService
  ) { }

  private emailID=this._loginService.emailId;


  ngOnInit() {

    this._profileService.display(this.emailID)
    .subscribe(data => {this.profile = data;
          // alert(this.profile[0][1]);
    });
  }
}
