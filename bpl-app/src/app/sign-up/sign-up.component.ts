import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators,FormBuilder, AbstractControl } from '@angular/forms';
import { User } from '../user';
import { EnrollmentService } from '../enrollment.service';
import { format } from 'path';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  form:FormGroup;

  userModal:User;
  email;username;password;squestion;dob;name;gender;alias;
  blood;mob;alt;locality;city;state;sanswer;

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
  constructor(private _enrollmentService: EnrollmentService,private fb:FormBuilder) { 

  }
  ngOnInit() {

    this.form = this.fb.group ({
      email     : ['',[Validators.required,Validators.email]],
      username  : ['',[Validators.required,Validators.pattern('[a-zA-Z ]*')]],
      password  : ['',[Validators.required,Validators.minLength(8),Validators.pattern('[a-zA-Z0-9]*')]],
      cpassword : ['',[Validators.required]],
      squestion : [''],
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
      state     : [''],
      profile   : [''],
      fcftk     : [''],
      cftk      : [''],
      
    });
  }

  securityQuestion = ['Childhood Hero Name','Favourite Book','First School','Favourite place'];
  bloodGroup=['O+','AB+','A+','B+','Other'];
  states=['Orissa','Jharkhand','UttarPradesh','Telangana','Other'];
  disclaimer ="We respect the privacy of an individual and hence we dont share any kind of data to the third party application, \
    in any form. Though the data provied by you can be used to improve the user experience.Apart from this ensure to use the real\
    name, in case of fake name being used the account can be permanently blocked. The field marked with the * marks are mandate to be filled.";
  passwordHint=['uppercase letter','lowercase letter','digit','special character'];


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

    this.email=this.form.get('email').value;
    this.username=this.form.get('username').value;
    this.password=this.form.get('password').value;
    this.squestion=this.form.get('squestion').value;
    this.dob=this.form.get('dob').value;
    this.name=this.form.get('pname').value;
    this.gender=this.form.get('gender').value;
    this.alias=this.form.get('aname').value;
    this.blood=this.form.get('blood').value;
    this.mob=this.form.get('mobile').value;
    this.alt=this.form.get('altno').value;
    this.locality=this.form.get('locality').value;
    this.city=this.form.get('city').value;
    this.state=this.form.get('state').value;
    this.sanswer=this.form.get('sanswer').value;
    this.userModal  = new User(this.email,this.username,this.password,this.squestion,this.dob,this.name,this.gender,this.alias,
    this.blood,this.mob,this.alt,this.locality,this.city,this.state,this.sanswer);

    this._enrollmentService.enroll(this.userModal)
    .subscribe(
      data=>console.log('Success!',data),
      error=>console.error('Error',error)
    )

  }

  resetForm()
  {

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
      profile   :'',
      fcftk     :'',
      cftk      :''
    })
  }
}
