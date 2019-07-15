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

  private user_name = localStorage.getItem('user_name');

  ngOnInit() {
    // document.body.classList.add('bg-profile');

    this._profileService.getProfile(this.user_name)
    .subscribe(data => 
    {
       this.profile = data
    });
  }
}