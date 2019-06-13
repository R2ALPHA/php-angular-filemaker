import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Form } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {

  _url='';
  constructor(private _http: HttpClient) { }

  //TODO:: THE USER ENROLLMENt
  //Currently  no user argument is mentioned
  enroll() {
    return this._http.post<any>(this._url,'');
  }
}
