import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { ConfirmDialogService } from '../confirm-dialog.service';
import { TaskService } from '../task.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-activity-detail-modal',
  templateUrl: './activity-detail-modal.component.html',
  styleUrls: ['./activity-detail-modal.component.css']
})
export class ActivityDetailModalComponent implements OnInit {

  private taskForm: FormGroup;
  constructor(

    @Inject(MAT_DIALOG_DATA) public data: any,

    private taskFb: FormBuilder,
    private dialog: MatDialog,
    private dialogService: ConfirmDialogService,
    private _taskService: TaskService,
    private _dialogRef:MatDialogRef<ActivityDetailModalComponent>,

  ) { 
  }

  ngOnInit() {

      this.taskForm = this.taskFb.group({
      assigned_by: [this.data.message.assigned_by],
      activity_name: [this.data.message.activity_name],
      start_date: [this.data.message.start_day],
      stop_date: [this.data.message.stop_date],
      start_time: [this.data.message.start_time],
      end_time: [this.data.message.end_time],
      activity_id: [this.data.message.activity_id],
      assigned_to: [this.data.message.assigned_to],
      comment: [this.data.message.comment],
    });
  }

  /** Will close the dialog */
  closeDialog():void {
    this.dialog.closeAll();
  }

  /** Will delete the activvity */
  /** TODO handle succesful Deletion and unsuccessful deletion */
  deleteActivity():void {
    this.dialogService.openConfirmDialog('Are You Sure want to delete this record')
      .afterClosed().subscribe(res => {
        if (res == true) {
          this._taskService.deleteTask(this.data.message.id)
            .subscribe(data => data);
            this.closeDialog();
          this._dialogRef.close(this.data.message.id);
          swal("Deleted!", "Task has been removed", "success")
        }
      })
  }
}
