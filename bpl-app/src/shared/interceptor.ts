import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { Router } from '@angular/router';
import 'rxjs/add/observable/throw'
import 'rxjs/add/operator/catch'

@Injectable()
export class Interceptor implements HttpInterceptor {

 constructor(
    private _router: Router
 ){

 }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
   
    if(localStorage.length <1 || localStorage.getItem('token')=="") {
        this._router.navigate(['/login'])
      }
  
    if (localStorage.getItem('token')!=null)
    {
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders().set("Authorization", "Bearer " + token);
        alert(token);
        const AuthRequest = request.clone({ headers: headers});
        return next.handle(AuthRequest);
    }
    else
    {
        return next.handle(request);
    }
  }
}