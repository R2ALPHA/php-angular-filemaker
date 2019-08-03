import { Component, OnInit, Inject, EventEmitter, Output } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { ConfirmDialogService } from '../../shared/services/confirm-dialog.service';
import { TaskService } from '../../shared/services/task.service';
// import swal from 'sweetalert';
// import * as _swal from 'sweetalert';
// import { SweetAlert } from 'sweetalert/typings/core';

// const swal: SweetAlert = _swal as any;

import { ObservableService } from '../../shared/services/observable.service';

@Component({
  selector: 'app-activity-detail-modal',
  templateUrl: './activity-detail-modal.component.html',
  styleUrls: ['./activity-detail-modal.component.css']
})
export class ActivityDetailModalComponent implements OnInit {
  [x: string]: any;

  private taskForm: FormGroup;

  @Output() updateView = new EventEmitter();

  constructor(

    @Inject(MAT_DIALOG_DATA) public data: any,

    private taskFb: FormBuilder,
    private dialog: MatDialog,
    private dialogService: ConfirmDialogService,
    private _taskService: TaskService,
    private _dialogRef:MatDialogRef<ActivityDetailModalComponent>,
    private _observableService:ObservableService

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

    /** It will not subscribe to the value of the observables */
    // this._observableService.taskDetails
    // .subscribe(
    //   uname => {
    //     alert("Activity data");
    //     uname = uname;
    //   });
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

          //delete task
          this._taskService.deleteTask(this.data.message.id)
          .subscribe(data => data);

          this.closeDialog();

          //send the message after closing the modal
          this._dialogRef.close(this.data.message.id);

          this.data.totalTask = this.data.totalTask.filter(
            event => (event.id !== this.data.message.id)
          );

          // this._observableService.totalTask.next(this.data.totalTask);  //This value will be passed to all componnets.

          // swal("Removed!", "Task has been removed", "success");

          //get all the activity and subscribe to the user
           this._taskService.getAllActivity()
          .subscribe(data=>
            {
              this._observableService.taskDetails.next(data);
            })
        }
      })
  }
}
