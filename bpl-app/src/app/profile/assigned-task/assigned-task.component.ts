import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { AddActivityComponent } from '../../add-activity/add-activity.component';
import { TaskService } from '../../../shared/services/task.service';

import { ProfileService } from '../../../shared/services/profile.service';

import * as faker from 'faker';


@Component({
  selector: 'app-assigned-task',
  templateUrl: './assigned-task.component.html',
  styleUrls: ['./assigned-task.component.scss']
})
export class AssignedTaskComponent implements OnInit {


}
