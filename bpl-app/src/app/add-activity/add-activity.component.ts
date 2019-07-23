import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators,FormBuilder} from '@angular/forms';
import { MatDialog, MatDialogConfig } from "@angular/material";

@Component({
  selector: 'app-add-activity',
  templateUrl: './add-activity.component.html',
  styleUrls: ['./add-activity.component.css']
})
export class AddActivityComponent implements OnInit {

  private taskForm:FormGroup;

  constructor( 
    private taskFb:FormBuilder,
    private dialog:MatDialog,
    ) { }

  ngOnInit() {

    this.taskForm = this.taskFb.group({
      assigned_by      : ['',[Validators.required]],
      activity_name    : ['',[Validators.required]],
      start_date       : ['',[Validators.required]],
      stop_date        : ['',[Validators.required]],
      start_time       : ['',[Validators.required]],
      end_time         : ['',[Validators.required]],
      assigned_to      : ['',[Validators.required]],
      comment          : [''],
    });

  }

  closeForm() {
    this.dialog.closeAll();
  }


}
