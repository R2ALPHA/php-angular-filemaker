import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public profile=[];
  
  constructor(
    private _profileService:ProfileService,
    private _loginService: LoginService
  ) { }

  private emailID = localStorage.getItem('user_name');

  ngOnInit() {
    document.body.classList.add('bg-img');
    this._profileService.display(this.emailID)
    .subscribe(data => this.profile = data);
  }
}
