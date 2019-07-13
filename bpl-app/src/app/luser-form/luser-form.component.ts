import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { ProfileService } from '../profile.service';
import { Router } from '@angular/router';
import { FormGroup, Validators,FormBuilder} from '@angular/forms';
import { EnrollmentService } from '../enrollment.service';
import { VERROR } from '../../shared/errors';

@Component({
  selector: 'app-luser-form',
  templateUrl: './luser-form.component.html',
  styleUrls: ['./luser-form.component.scss']
})
export class LuserFormComponent implements OnInit {

  loginForm:FormGroup;
  signupForm:FormGroup;


  constructor(

    private _loginService: LoginService,
    private loginFb:FormBuilder,
    private signupFB:FormBuilder,
    private _profileService:ProfileService,
    private _router:Router,
    private _enrollmentService: EnrollmentService

  ) { }

  ngOnInit() {

    this.loginForm = this.loginFb.group({
      user_name       : ['',[Validators.required]],
      password        : ['',[Validators.required]],
    });

    this.signupForm = this.signupFB.group ({

      _pk_email_id       : ['',[Validators.required,Validators.email]],
      user_name          : ['',[Validators.required,Validators.pattern('[a-zA-Z ]*')]],
      player_name        : ['',[Validators.required,Validators.pattern('[a-zA-Z ]*')]],
      password           : ['',[Validators.required,Validators.minLength(8),Validators.pattern('[a-zA-Z0-9]*')]],

    });
  }

  /** After Submitting the  login Form */
  onLoginSubmit() {
    this.processLoginSubmission();
  }
  

  /* After Submitting the signup form*/
  onSignupSubmit() {
    this.processSignupSubmission();
  }

  /* Will process Login Submission */
  processLoginSubmission() {
    this._loginService.login(this.loginForm.value)
    .subscribe(
      data=>{
        if(data.status!=404) {                                             //make this as 200 status code
          
          localStorage.setItem('token',data.token);
          localStorage.setItem('expiry',data.expires);
          localStorage.setItem('user_name',this.loginForm.value.user_name);
          localStorage.setItem('logged_in','1');
          this._profileService.profileData=data;
          this._loginService.isLoggedIn=true;
        
          this._router.navigate(['/profile']);
        }
      },
      error=> {
        console.error('Error',error);
        alert("Wrong Credentials");
      }
    )
  }


  /** Will process signup submission */
  processSignupSubmission() {
    this._enrollmentService.enroll(this.signupForm.value)
    .subscribe(
      data=>console.log('Success!',data),
      error=>console.error('Error',error),
    )
  }

  /**
   *  it will toggle between the login and signup box 
   */
  loginBoxToggle()
  {

    let query = document.querySelector('.box-login-content');

    if(query.classList.contains('is--login') ){
      query.classList.remove('is--login');
      query.classList.add('is--signup');
    }
    else {
      query.classList.remove('is--signup');
      query.classList.add('is--login');
    }
  }

}
