import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators,FormBuilder } from '@angular/forms';
import { EnrollmentService } from '../../shared/services/enrollment.service';
import { VERROR } from '../../shared/errors';
import { securityQuestion, bloodGroup,states,disclaimer,passwordHint} from '../../shared/registrationConstant';
import { Validator } from '../../shared/validator';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  form:FormGroup;
  validator:Validator = new Validator();

  public  validationMessages=VERROR;

  public  securityQuestion =  securityQuestion;
  public  bloodGroup =  bloodGroup;
  public  states = states;
  public  disclaimer = disclaimer;
  public  passwordHint = passwordHint;

  constructor(private _enrollmentService: EnrollmentService,private fb:FormBuilder) { 

  }
  ngOnInit() {

    document.body.classList.add('bg-img');

    this.form = this.fb.group ({

      _pk_email_id       : ['',[Validators.required,Validators.email]],
      user_name          : ['',[Validators.required,Validators.pattern('[a-zA-Z ]*')]],
      password           : ['',[Validators.required,Validators.minLength(8),Validators.pattern('[a-zA-Z0-9]*')]],
      security_question  : ['Childhood Hero Name'],
      security_answer    : ['',Validators.required],
      player_name        : ['',[Validators.required,Validators.pattern('[a-zA-Z ]*')]],
      blood_group        : [''],
      // dob                : ['',[Validators.required,this.validator.ageValidator]], 
      gender             : [''],
      mobile_no          : [''],
      alt_mobile_no         : [''],
      locality           : [''],
      city               : [''],
      state              : ['Jharkhand'],

    });
  }

  onSubmit() {

    this.processSubmission();
    alert("Form Successfully Submitted");
    console.log(JSON.stringify(this.form.value));
  }

  processSubmission() {
    this._enrollmentService.enroll(this.form.value)
    .subscribe(
      data=>console.log('Success!',data),
      error=>console.error('Error',error),
    )
  }
}
