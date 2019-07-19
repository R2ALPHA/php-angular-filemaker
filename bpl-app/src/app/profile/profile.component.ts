import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { EnrollmentService } from '../enrollment.service';
import { ProfileService } from '../profile.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from "@angular/material";

import { UpdateProfileComponent } from '../update-profile/update-profile.component';

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
  ) { }

  private user_name = localStorage.getItem('user_name');

  ngOnInit() {
    this._profileService.getProfile(this.user_name)
      .subscribe(data => {
        this.profile = data
      });
  }


  updateProfile() {
    this.updateForm();
  }

  closeUpdateProfile() {
    this.closeUpdateForm();
  }

  updateForm() {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.dialog.open(UpdateProfileComponent, dialogConfig);
  }

  closeUpdateForm() {
    this.dialog.closeAll();
  }


}