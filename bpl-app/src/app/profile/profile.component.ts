import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { ProfileService } from '../profile.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public profile=[];
  
  constructor(
    private _profileService:ProfileService,
    private _loginService: LoginService,
    private _router: Router
  ) { }

  private emailID = localStorage.getItem('user_name');

  ngOnInit() {
     document.body.classList.add('bg-profile');
    if(localStorage.length <1 || localStorage.getItem('token')=="") {
      this._router.navigate(['/login'])
    }
    // this._router.navigate(['/main-nav']);
 
    this._profileService.display(this.emailID)
    .subscribe(data => 
    {
       this.profile = data
       this.profile[0].forEach( element => {
         if(element == "")
          element = "NA";
       });
    });
  }
}
