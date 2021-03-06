import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../shared/services/login.service';
import { EnrollmentService } from '../../shared/services/enrollment.service';
import { ProfileService } from '../../shared/services/profile.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from "@angular/material";

import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { AddActivityComponent } from '../activity/add-activity/add-activity.component';
import { TaskService } from '../../shared/services/task.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public profile = [];

  constructor(
    private _profileService: ProfileService,
    private dialog:MatDialog,
    private _taskService:TaskService
  ) { 
    
    this._profileService.getProfile(this.user_name)
      .subscribe(data => {
        this.profile = data
        localStorage.setItem('player_id',this.profile[0].id);
        this._profileService.setProfileData(this.profile);    //TO-DO
      });
  }

  private user_name = localStorage.getItem('user_name');

  ngOnInit() {

    
      // this._taskService.getAllActivity();
  }


  updateProfile() {
    this.updateForm();
  }

  closeUpdateProfile() {
    this.closeForm();
  }

  updateForm() {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.dialog.open(UpdateProfileComponent, dialogConfig);
  }

  closeForm() {
    this.dialog.closeAll();
  }
}