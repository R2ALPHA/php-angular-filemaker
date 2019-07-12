import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private Http:HttpClient) { }

  Authentication(username:string,password:string){
    let json = {username:username,password:password}
    return this.Http.post("http://localhost:8080/v1/member/auth/login",json); 
  }
  
}
