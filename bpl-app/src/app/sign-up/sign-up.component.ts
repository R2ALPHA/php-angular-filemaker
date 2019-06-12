import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../user';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  form = new FormGroup({
    email     : new FormControl('',[Validators.required,Validators.email]),
    username  : new FormControl('',Validators.required),
    password  : new FormControl('',[Validators.required,Validators.minLength(8)]),
    cpassword : new FormControl('',Validators.required),
    squestion : new FormControl(''),
    sanswer   : new FormControl('',Validators.required),
    pname     : new FormControl('',Validators.required),
    aname     : new FormControl(''),
    blood     : new FormControl(''),
    dob       : new FormControl('',Validators.required),
    gender    : new FormControl(''),
    mobile    : new FormControl(''),
    altno     : new FormControl(''),
    locality  : new FormControl(''),
    city      : new FormControl(''),
    state     : new FormControl(''),
    profile   : new FormControl(''),
    fcftk     : new FormControl(''),
    cftk      : new FormControl('')
  });
  constructor() { }

  ngOnInit() {
  }

  securityQuestion = ['Childhood Hero Name','Favourite Book','First School','Favourite place'];
  bloodGroup=['O+','AB+','A+','B+','Other'];
  states=['Orissa','Jharkhand','UttarPradesh','Telangana','Other'];
  disclaimer ="We respect the privacy of an individual and hence we dont share any kind of data to the third party application, \
    in any form. Though the data provied by you can be used to improve the user experience.Apart from this ensure to use the real\
    name, in case of fake name being used the account can be permanently blocked. The field marked with the * marks are mandate to be filled.";
  passwordHint=['uppercase letter','lowercase letter','digit','special character'];

  onSubmit() {
    alert(JSON.stringify(this.form.value));
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
  }
}
