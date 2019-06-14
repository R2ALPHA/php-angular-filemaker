import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators,FormBuilder, AbstractControl } from '@angular/forms';
import { EnrollmentService } from '../enrollment.service';
import { VERROR } from '../../shared/errors';
import {  securityQuestion, bloodGroup,states,disclaimer,passwordHint} from '../../shared/registrationConstant';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  form:FormGroup;

  public  validationMessages=VERROR;

  public  securityQuestion =  securityQuestion;
  public  bloodGroup =  bloodGroup;
  public  states = states;
  public  disclaimer = disclaimer;
  public  passwordHint = passwordHint;

  constructor(private _enrollmentService: EnrollmentService,private fb:FormBuilder) { 

  }
  ngOnInit() {

    this.form = this.fb.group ({
      email     : ['',[Validators.required,Validators.email]],
      username  : ['',[Validators.required,Validators.pattern('[a-zA-Z ]*')]],
      password  : ['',[Validators.required,Validators.minLength(8),Validators.pattern('[a-zA-Z0-9]*')]],
      cpassword : ['',[Validators.required]],
      squestion : ['Childhood Hero Name'],
      sanswer   : ['',Validators.required],
      pname     : ['',[Validators.required,Validators.pattern('[a-zA-Z ]*')]],
      aname     : [''],
      blood     : [''],
      dob       : ['',[Validators.required,this.ageValidator]],
      gender    : [''],
      mobile    : [''],
      altno     : [''],
      locality  : [''],
      city      : [''],
      state     : ['Jharkhand'],
      profile   : [''],
      fcftk     : [''],
      cftk      : [''],
      
    });
  }

passwordValidator(control: AbstractControl): { [key: string]: boolean } | null {

  let password = control.value;
  if (control.value !== undefined && control.value==password) {
      return { 'password': true };
  }
  return null;
}


ageValidator(control: AbstractControl): { [key: string]: boolean } | null {

  let bday= control.value;
  let bdayArr=bday.split('-');
  let bdayYr=parseInt(bdayArr[0]);
  let currDt= new Date();
  let currYr = currDt.getFullYear();

  if((currYr-bdayYr)<18|| (currYr-bdayYr)>30)
      return {'bday':true}
      
  return null;
}


  onSubmit() {

    this.processSubmission();
    alert("Form Successfully Submitted");
    console.log(JSON.stringify(this.form.value));
  }


  processSubmission()
  {
    this._enrollmentService.enroll(this.form.value)
    .subscribe(
      data=>console.log('Success!',data),
      error=>console.error('Error',error),
    )

  }
}
