import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public profileData;
  public policy;
  
  constructor(
    private _profileService:ProfileService,
    private _loginService: LoginService
  ) { }

  private emailID=this._loginService.emailId;
  
  ngOnInit() {
   this.policy=this._profileService.profileData.record
   alert( this._profileService.profileData.record);
  }

}
