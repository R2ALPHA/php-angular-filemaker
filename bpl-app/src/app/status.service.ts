import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { IStatus} from '../shared/status';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  private _url ="http://localhost:8080/status"

  constructor(private _http: HttpClient) { }

  //Currently data type has not been assigned for formatting
  getAllStatus():Observable<IStatus>{
    return this._http.get<IStatus>(this._url);
  }

  addStatus(task_detail):Observable<IStatus>{
    return this._http.post<IStatus>(this._url, task_detail);
  }


  getParticularStatus(){
 
  }
  
  deleteStatus() {

  }
}
