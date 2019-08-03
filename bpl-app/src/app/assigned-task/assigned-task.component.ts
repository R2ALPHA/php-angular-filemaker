import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { AddActivityComponent } from '../add-activity/add-activity.component';
import { TaskService } from '../../shared/services/task.service';

import { ProfileService } from '../../shared/services/profile.service';

import * as faker from 'faker';


@Component({
  selector: 'app-assigned-task',
  templateUrl: './assigned-task.component.html',
  styleUrls: ['./assigned-task.component.scss']
})
export class AssignedTaskComponent implements OnInit {

  taskDetail;
  people;
  constructor(

    private dialog:MatDialog,
    private _taskService: TaskService,
    private _profileService:ProfileService

  ) { 
    this.people = Array(100)
    .fill(1)
    .map(_=> {
      return {
        name: faker.name.findName(),
        bio:faker.hacker.phrase(),
      }
    })
  }

  ngOnInit() {
    this._taskService.getAllTask()
    .subscribe(data => {
      this.taskDetail = data
    });
  }

  addTaskForm() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.dialog.open(AddActivityComponent, dialogConfig);
  }

  closeTaskForm() {
    this.dialog.closeAll();
  }

}
