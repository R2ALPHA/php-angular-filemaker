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
  getAllTask() :Observable<ITask[]>{
    this._url = 'http://localhost:8080/v1/users';
    alert("reached here");
    return this._http.get<ITask[]>(this._url);
  }
}
