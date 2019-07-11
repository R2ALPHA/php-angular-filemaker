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

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
    
  constructor(private breakpointObserver: BreakpointObserver, private _loginService: LoginService) {}

  ngOnInit() {
  }

  logOut() {
    localStorage.clear();
    // localStorage.unsetItem("token");
    // localStorage.unsetItem("expiry");
    // localStorage.unsetItem('user_name');
    // localStorage.setItem("logged_in",'0');
    this._loginService.isLoggedIn=false;
  }
  
  }

