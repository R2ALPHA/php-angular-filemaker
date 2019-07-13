import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators,FormBuilder} from '@angular/forms';
import { AdminLoginService } from "../admin-login.service";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  adminForm:FormGroup;

  constructor(

    private adminFb:FormBuilder,
    private _adminService: AdminLoginService,
    private _router:Router,

  ) { }

  ngOnInit() {

    this.adminForm = this.adminFb.group({
      admin_name       : ['',[Validators.required]],
      password         : ['',[Validators.required]],
    });

  }

  
  onSubmit() {
    this.processSubmission();
  }

  processSubmission() {
    this._adminService.getLoginResponse(this.adminForm.value)
    .subscribe(
      data=>{
        if(data.status!=404) {                                             //make this as 200 status code
          
          localStorage.setItem('file-token',data.token);
          localStorage.setItem('expiry',data.expires);
        
          this._router.navigate(['/']);
        }
        else{
          alert("Wrong Credentials");
        }
      },
      error=>console.error('Error',error),
    )
  }


}