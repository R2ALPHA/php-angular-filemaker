import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, Validators,FormBuilder} from '@angular/forms';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from "@angular/material";

@Component({
  selector: 'app-activity-detail-modal',
  templateUrl: './activity-detail-modal.component.html',
  styleUrls: ['./activity-detail-modal.component.css']
})
export class ActivityDetailModalComponent implements OnInit {

  private taskForm:FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private taskFb:FormBuilder,
    private dialog:MatDialog,
  ) { }

  ngOnInit() {
    
    this.taskForm = this.taskFb.group({
      assigned_by      : [this.data.assigned_by],
      activity_name    : [this.data.activity_name],
      start_date       : [this.data.start_day],
      stop_date        : [this.data.stop_date],
      start_time       : [this.data.start_time],
      end_time         : [this.data.end_time],
      activity_id      : [this.data.activity_id],
      comment          : [this.data.comment],
    });
  }

  /* TODO Close Method*/

  closeDialog(){
    this.dialog.closeAll();
  }
}
