import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { User } from '../user';
import { EnrollmentService } from '../enrollment.service';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {


  form:FormGroup;

  formErrors={
    'email'     :'',
    'username'  :'',
    'password'  :'',
    'cpassword' :'',
    'sanswer'   :'',
    'pname'     :'',
    'dob'       :''       
  };


  validationMessages = {
    'email'     : {
      'required':      'Email is required.',
      'email':         'Email not in valid format.'
    },
    'username'  : {
      'required':      'First Name is required.',
      'pattern' :      'Only alphabet ',
    },
    'password'  : {
      'required':      'Password is required.',
      'password':      'Enter the valid format',
      'minlength':     'length should be > 8',
    },
    'cpassword' : {
      'required':      'This field is required.',
      'password':      'Password  not match'
    },
    'sanswer'   : {
      'required':      'This field is required.',
    },
    'pname'     : {
      'required':      'Name is required.',
      'pattern' :      'Only alphabet ',
    },
    'dob'       : {
      'required':      'DOB is required ',
      'bday'    :      'Outside the limit'
    }
  }
  constructor(private _enrollmentService: EnrollmentService) { }

  ngOnInit() {
    this.form = new FormGroup({
      email     : new FormControl('',[Validators.required,Validators.email]),
      username  : new FormControl('',[Validators.required,Validators.pattern('[a-zA-Z ]*')]),
      password  : new FormControl('',[Validators.required,Validators.minLength(8),Validators.pattern('[a-zA-Z0-9]*')],),
      cpassword : new FormControl('',[Validators.required]),
      squestion : new FormControl(''),
      sanswer   : new FormControl('',Validators.required),
      pname     : new FormControl('',[Validators.required,Validators.pattern('[a-zA-Z ]*')]),
      aname     : new FormControl(''),
      blood     : new FormControl(''),
      dob       : new FormControl('',[Validators.required,this.ageValidator]),
      gender    : new FormControl(''),
      mobile    : new FormControl(''),
      altno     : new FormControl(''),
      locality  : new FormControl(''),
      city      : new FormControl(''),
      state     : new FormControl(''),
      profile   : new FormControl(''),
      fcftk     : new FormControl(''),
      cftk      : new FormControl(''),
      
    });
  }

  securityQuestion = ['Childhood Hero Name','Favourite Book','First School','Favourite place'];
  bloodGroup=['O+','AB+','A+','B+','Other'];
  states=['Orissa','Jharkhand','UttarPradesh','Telangana','Other'];
  disclaimer ="We respect the privacy of an individual and hence we dont share any kind of data to the third party application, \
    in any form. Though the data provied by you can be used to improve the user experience.Apart from this ensure to use the real\
    name, in case of fake name being used the account can be permanently blocked. The field marked with the * marks are mandate to be filled.";
  passwordHint=['uppercase letter','lowercase letter','digit','special character'];



  //two separation versio of the value changed one passing the data and other not.
  onValueChanged(data?: any){
    if(!this.form){return ;}
    const form=this.form;
    for(const field in this.formErrors ){
      if(this.formErrors.hasOwnProperty(field)){
      //clear previous messages if any 
      this.formErrors[field]='';
      const control=form.get(field);
      if(control && control.dirty && !control.valid){
        const messages=this.validationMessages[field];
        for(const key in control.errors){
          if(control.errors.hasOwnProperty(key)){
            this.formErrors[field]+=messages[key]+'';
          }
        }
      }
    }
    }
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

  // alert(currYr-bdayYr);
  return null;
}


  onSubmit() {
    alert("Form Successfully Submitted");
    console.log(JSON.stringify(this.form.value));
    this.form.reset({
      email     :'',
      username  :'',
      password  :'',
      cpassword :'',
      squestion :'',
      sanswer   :'',
      pname     :'',
      aname     :'',
      dob       :'',
      mobile    :'',
      altno     :'',
      locality  :'',
      city      :'',
      state     :'',
      profile   :'',
      fcftk     :'',
      cftk      :''
    })
    this._enrollmentService.enroll()
      .subscribe(
        data=>console.log('Success!',data),
        error=>console.error('Error',error)
      )
  }


  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            // return if another validator has already found an error on the matchingControl
            return;
        }

        // set error on matchingControl if validation fails
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
}
}
