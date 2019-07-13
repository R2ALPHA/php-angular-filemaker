import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { ProfileService } from '../profile.service';
import { Router } from '@angular/router';
import { FormGroup, Validators,FormBuilder} from '@angular/forms';

import { MatDialog, MatDialogConfig } from "@angular/material";
import { AdminComponent } from '../admin/admin.component';

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
      private _router:Router,
      private dialog:MatDialog
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
        if(data.status!=404) {                                             //make this as 200 status code
          
          localStorage.setItem('token',data.token);
          localStorage.setItem('expiry',data.expires);
          localStorage.setItem('user_name',this.logForm.value.user_name);
          localStorage.setItem('logged_in','1');
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

  adminLogin() {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose=true;
    dialogConfig.autoFocus =  true;
    dialogConfig.width="60%";
    this.dialog.open(AdminComponent, dialogConfig);
  }
  
}
