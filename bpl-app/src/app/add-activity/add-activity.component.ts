import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators,FormBuilder} from '@angular/forms';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { TaskService } from '../task.service';

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
    private _taskService:TaskService
    ) { }

  ngOnInit() {

    this.taskForm = this.taskFb.group({
      assigned_by      : ['',[Validators.required]],
      activity_name    : ['',[Validators.required]],
      start_date       : [''],
      stop_date        : [''],
      start_time       : ['',[Validators.required]],
      end_time         : ['',[Validators.required]],
      assigned_to      : ['',[Validators.required]],
      comment          : [''],
    });

  }

  closeForm() {
    this.dialog.closeAll();
  }

  processSubmission() {
    
    alert(this.taskForm.value.start_date);
    alert(this.taskForm.value.stop_date);

    this._taskService.addActivity(this.taskForm.value)
    .subscribe(
      data=>{
        if(data.status==201) {                                
          alert("Tasks Added");
        }
        else{
          alert("Sorry for inconvenience");
        }
      },
      error=> {
        console.error('Error',error);
        alert("Unknown Error Occured");
      }
    )
  }
}
