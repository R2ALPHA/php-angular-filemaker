import { Component, OnInit } from '@angular/core';

import { FormControl, FormGroup, Validators,FormBuilder, AbstractControl } from '@angular/forms';
import { EnrollmentService } from '../enrollment.service';
import { VERROR } from '../../shared/errors';
import { securityQuestion, bloodGroup,states,disclaimer,passwordHint} from '../../shared/registrationConstant';
import { MatDialog, MatDialogConfig } from "@angular/material";

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

  constructor(

    private _enrollmentService: EnrollmentService,
    private updateFb:FormBuilder,
    private dialog:MatDialog

    ) { }

  ngOnInit() {


    this.updateForm = this.updateFb.group ({

      _pk_email_id       : ['',[Validators.required,Validators.email]],
      user_name          : ['',[Validators.required,Validators.pattern('[a-zA-Z ]*')]],
      password           : ['',[Validators.required,Validators.minLength(8),Validators.pattern('[a-zA-Z0-9]*')]],
      // security_question  : ['Childhood Hero Name'],
      security_answer    : ['',Validators.required],
      player_name        : ['',[Validators.required,Validators.pattern('[a-zA-Z ]*')]],
      // blood_group        : [''],
      dob                : ['',[Validators.required,this.validator.ageValidator]], 
      gender             : [''],
      mobile_no          : [''],
      alt_mobile_no         : [''],
      locality           : [''],
      city               : [''],
      // state              : ['Jharkhand'],

    });
  }

  onSubmit() {

    this.processSubmission();
    console.log(JSON.stringify(this.updateForm.value));
  }

  processSubmission() {
    // this._enrollmentService.update(this.updateForm.value)
    // .subscribe(
    //   (data)=> {
    //     console.log('Success!',data);
    //     alert("Data Updated");
    //   },
    //   error=>console.error('Error',error),
    // )
  }

  closeForm() {

    this.dialog.closeAll();

  }
}


