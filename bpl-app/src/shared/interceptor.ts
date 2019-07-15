import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpHeaders } from "@angular/common/http";
import { AdminLoginService } from '../app/admin-login.service';
import { Observable } from "rxjs/Observable";
import { Router } from '@angular/router';
import 'rxjs/add/observable/throw'
import 'rxjs/add/operator/catch'

@Injectable()
export class Interceptor implements HttpInterceptor {

 constructor(
    private _router: Router,
    private _adminService: AdminLoginService,
 ){

 }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if(localStorage.length <1 || localStorage.getItem('admin-token')==null)
    {
      this._adminService.adminLogin();
    }
   
    if(localStorage.length <1 || localStorage.getItem('token')==null) {
        this._router.navigate(['/signup-login'])
      }
  
    if (localStorage.getItem('token')!=null){

        const token = localStorage.getItem('token');
        const headers = new HttpHeaders().set("Authorization", "Bearer " + token);
        const AuthRequest = request.clone({ headers: headers});
        return next.handle(AuthRequest);
    }
    else {
        return next.handle(request);
    }
  }
}