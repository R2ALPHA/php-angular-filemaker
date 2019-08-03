import { Component, OnInit } from '@angular/core';

import { MatDialog, MatDialogConfig } from "@angular/material";
import { AddActivityComponent } from '../../activity/add-activity/add-activity.component';
import { TaskService } from '../../../shared/services/task.service';

import { ProfileService } from '../../../shared/services/profile.service';

import * as faker from 'faker';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent implements OnInit {

  public playerDetails;;
  public people;
  
  constructor(

    private dialog:MatDialog,
    private _taskService: TaskService,
    private _profileService:ProfileService

  ) { 

    /** Faker js library for randomly generating the data */
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
      this.playerDetails = data
    });
  }

  /** If you want to add task for the player then you can even do it from here */
  addTaskForm() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.dialog.open(AddActivityComponent, dialogConfig);
  }

  /** Close the task for after adding the task. */
  closeTaskForm() {
    this.dialog.closeAll();
  }
}
