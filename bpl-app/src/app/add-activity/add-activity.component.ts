import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators,FormBuilder} from '@angular/forms';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { TaskService } from '../task.service';
import { DatePipe } from '@angular/common';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-add-activity',
  templateUrl: './add-activity.component.html',
  styleUrls: ['./add-activity.component.css']
})
export class AddActivityComponent implements OnInit {

  private taskForm:FormGroup;
  public date:DatePipe;

  public taskAdded:boolean;
  public username:String;
  public all_user:Object;
  
  constructor( 

    private taskFb:FormBuilder,
    private dialog:MatDialog,
    private _taskService:TaskService,
    private _profileService:ProfileService,
    public datepipe: DatePipe

    ) { }

  
  ngOnInit() {
    
    this.taskAdded=true;
    this.username=localStorage.getItem('user_name');
    this._taskService.getAllTask()
    .subscribe(data => {
      this.all_user = data
    });

    this.taskForm = this.taskFb.group({
      assigned_by      : [this.username,[Validators.required]],
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

  processSubmission() {
    
    this.taskForm.value.start_date =this.datepipe.transform(this.taskForm.value.start_date, 'M/d/yy');
    this.taskForm.value.stop_date=this.datepipe.transform(this.taskForm.value.stop_date, 'M/d/yy');
    let taskValue = this.taskForm.value.assigned_to;
    taskValue.forEach(element => {
      this.taskForm.value.assigned_to=element.user_name;
      this.addActivityForMultipleUser();
    });

    if(this.taskAdded)
    {
      alert("Task Succeessfully Added");
    }
    else
    {
      alert("Sorry For the inconvenience");
    }
  }

  addActivityForMultipleUser() {

    this._taskService.addActivity(this.taskForm.value)
    .subscribe(
      data=>{
        if(data.status!=404) {                                
          this.taskForm.reset();
          this.closeForm();
        }
        else{
          this.taskAdded=false;
        }
      },
      error=> {
        console.error('Error',error);
        this.taskAdded=false;
      }
    )

  }
}
