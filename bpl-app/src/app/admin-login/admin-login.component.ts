import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators,FormBuilder} from '@angular/forms';
import { AdminLoginService } from '../admin-login.service';


@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  logForm:FormGroup;

  constructor(
    private fb:FormBuilder,
    private _router:Router,
    private _adminService:AdminLoginService
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
    // this.logForm.value.admin_name = "\""+this.logForm.value.admin_name +"\"";
    alert(this.logForm.value.user_name);
    this._adminService.getLoginResponse(this.logForm.value)
    .subscribe(
      data=>{
        if(data.status!=404) {                                             //make this as 200 status code
          
          localStorage.setItem('file-token',data.token);
          localStorage.setItem('expiry',data.expires);
        
          this._router.navigate(['/signup-login']);
        }
        else{
          alert("Wrong Credentials");
        }
      },
      error=>console.error('Error',error),
    )
  }



}
