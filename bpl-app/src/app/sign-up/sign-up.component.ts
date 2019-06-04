import { Component, OnInit } from '@angular/core';
//import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../user';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  securityQuestion = ['Childhood Hero Name','Favourite Book','First School','Favourite place'];
  bloodGroup=['O+','AB+','A+','B+','Other'];
  states=['Orissa','Jharkhand','UttarPradesh','Telangana','Other'];
}
