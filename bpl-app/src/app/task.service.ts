import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { ITask } from '../shared/task';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  public userData;
  private _url;
  constructor(private _http: HttpClient) { }

  //Currently it is giving the user data
  //need to reduce the code their are lots of repetition here,.....
  getAllTask() :Observable<ITask[]>{
    this._url = 'http://localhost:8080/v1/users';
    return this._http.get<ITask[]>(this._url);
  }

  addActivity(task_detail){

    this._url='http://localhost:8080/v1/activity';
    return this._http.post<any>(this._url, task_detail);
  }

  getAllActivity():Observable<ITask[]> {
    this._url ='http://localhost:8080/v1/activities';
    return this._http.get<ITask[]>(this._url);
  }

  getAllTaskOfAParticularPlayer():Observable<any>{
    this._url='http://localhost:8080/v1/activity/'+localStorage.getItem('player_id');
    return this._http.get<any>(this._url);
  }

  deleteTask(activity_id){
    
    this._url='http://localhost:8080/v1/activity/'+activity_id;
    return this._http.delete<any>(this._url,activity_id);

  }
}