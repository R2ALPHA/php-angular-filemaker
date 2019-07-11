import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { ProfileService } from '../profile.service';
import { MatLineSetter, MAT_BOTTOM_SHEET_DATA } from '@angular/material';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public profileData;
  public policy;
  private _mainData;
  
  constructor(
    private _profileService:ProfileService,
    private _loginService: LoginService
  ) { }

  private emailID=this._loginService.emailId;


  ngOnInit() {
 
  //  this.policy=this._profileService.profileData.record
  //  alert( this._profileService.profileData.record);
  
  this.profileData = this._profileService.display(this.emailID)
  .subscribe(
    data=>{
      console.log('Success!',data);
      this.policy=JSON.stringify(data);
      this.setData(this.policy);
    
      // alert(this.profileData);
      alert(this._mainData);
  })


  // this.policy = this.profileData.data;
  
  // alert(this.policy[0][0]);

  }

  
  setData(data)
  {
    alert("data"+data);
    this._mainData=data;
  }


}
