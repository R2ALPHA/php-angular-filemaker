import { Injectable } from '@angular/core';
import { Observable,Subject } from 'rxjs';
import { TaskService } from './task.service';

@Injectable({
  providedIn: 'root'
})
export class ObservableService {

  constructor(
    private _taskService: TaskService
  ) { }
  
  userName = new Subject<any>();

  //For Subscribing to the tasks::

  taskDetails = new Subject<any>();
  

}
