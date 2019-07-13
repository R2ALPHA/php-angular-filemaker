import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoginService } from '../login.service';
@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent {

  private _header:boolean;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
    
  constructor(private breakpointObserver: BreakpointObserver, private _loginService: LoginService) {
    
  }

  ngOnInit() {
    if(!localStorage.getItem('token')) {
      this._header=true;
    }
  }

  logOut() {
    localStorage.clear();
    this._header=false;
    this._loginService.isLoggedIn=false;
  }
  
  }

