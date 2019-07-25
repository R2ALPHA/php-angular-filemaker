import { Component, OnInit } from '@angular/core';

import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { inject } from '@angular/core/testing';
@Component({
  selector: 'app-confirm-dialogue',
  templateUrl: './confirm-dialogue.component.html',
  styleUrls: ['./confirm-dialogue.component.css']
})
export class ConfirmDialogueComponent implements OnInit {

  constructor(
    public dialogRef:MatDialogRef<ConfirmDialogueComponent>
  ) { }

  ngOnInit() {
  }
  
  closeDialog(){
    this.dialogRef.close(false);
  }

}
