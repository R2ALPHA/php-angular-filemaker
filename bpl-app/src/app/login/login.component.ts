import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { ProfileService } from '../profile.service';
import { Router } from '@angular/router';
import { FormGroup, Validators,FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  logForm:FormGroup;

  constructor(
      private _loginService: LoginService,
      private fb:FormBuilder,
      private _profileService:ProfileService,
      private _router:Router
      ) { }

  ngOnInit() {
    document.body.classList.add('bg-img');

    this.logForm = this.fb.group({
      user_name       : ['',[Validators.required]],
      password        : ['',[Validators.required]],

    });


  }
  onSubmit() {
    this.processSubmission();
  }

  processSubmission() {
    this._loginService.login(this.logForm.value)
    .subscribe(
      data=>{
        console.log('Success!',data);
        if(data.status!=404) {
          localStorage.setItem('token',data.token);
          localStorage.setItem('expiry',data.expires);
          localStorage.setItem('user_name',this.logForm.value.user_name);
          this._profileService.profileData=data;
          this._loginService.isLoggedIn=true;
          this._router.navigate(['/profile']);

        }
        else{
          alert("Wrong Credentials");
        }
      },
      error=>console.error('Error',error),

    )
  }

}
