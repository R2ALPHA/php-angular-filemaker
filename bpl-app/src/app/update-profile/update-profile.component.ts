import { Component, OnInit } from '@angular/core';

import { FormControl, FormGroup, Validators,FormBuilder, AbstractControl } from '@angular/forms';
import { EnrollmentService } from '../enrollment.service';
import { VERROR } from '../../shared/errors';
import { securityQuestion, bloodGroup,states,disclaimer,passwordHint} from '../../shared/registrationConstant';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { ProfileService } from '../profile.service';

import { Validator } from '../../shared/validator';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.scss']
})
export class UpdateProfileComponent implements OnInit {

  updateForm:FormGroup;
  validator:Validator = new Validator();

  public  validationMessages=VERROR;

  public  securityQuestion =  securityQuestion;
  public  bloodGroup =  bloodGroup;
  public  states = states;
  public  disclaimer = disclaimer;
  public  passwordHint = passwordHint;
  public  profileData = [];

  private user_name = localStorage.getItem('user_name');

  constructor(

    private _enrollmentService: EnrollmentService,
    private updateFb:FormBuilder,
    private dialog:MatDialog,
    private _profileService: ProfileService,
    ) { }

  ngOnInit() {

    this.profileData=this._profileService.getProfileData();

    this.updateForm = this.updateFb.group ({

      _pk_email_id       : [this.profileData[0]._pk_email_id,[Validators.email]],
      user_name          : [this.profileData[0].user_name,[Validators.pattern('[a-zA-Z ]*')]],
      password           : [this.profileData[0]],
      // security_question  : ['Childhood Hero Name'],
      security_answer    : [this.profileData[0].security_question],
      player_name        : [this.profileData[0].player_name,[Validators.pattern('[a-zA-Z ]*')]],
      // blood_group        : [''],
      dob                : [this.profileData[0].dob], 
      // dob                : [], 
      gender             : [this.profileData[0].gender],
      mobile_no          : [this.profileData[0].mobile_no],
      alt_mobile_no      : [this.profileData[0].alt_mobile_no],
      locality           : [this.profileData[0].locality],
      city               : [this.profileData[0].city],
      // state              : ['Jharkhand'],
    });
  }

  onSubmit() {
    this.processSubmission();
  }

  processSubmission() {

    this._profileService.updateProfileData(this.updateForm.value)
    .subscribe(
      data=>{
        if(data.status==200 || data.status==201) {                                
          alert("Profile Updated");
        }
        else{
          alert("Unknown Error Occured");
        }
      },
      error=> {
        console.error('Error',error);
        alert("Unknown Error Occured");
      }
    )
  }

  closeForm() {

    this.dialog.closeAll();

  }
}


