import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators,FormBuilder, AbstractControl } from '@angular/forms';
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
      private _router:Router
      ) { }

  ngOnInit() {

    this.logForm = this.fb.group({
      email     : ['',[Validators.required,Validators.email]],
      password  : ['',[Validators.required]],

    });


  }
  onSubmit() {
    this.processSubmission();
    alert("Successfully login");
  }

  processSubmission() {
    this._loginService.login(this.logForm.value)
    .subscribe(
      data=>{
        console.log('Success!',data);
        if(data.status!=404) {
          localStorage.setItem('token',data.token);
          localStorage.setItem('expiry',data.expires);
          this._router.navigate(['/profile']);
        }
      },
      error=>console.error('Error',error),

    )
  }

}
