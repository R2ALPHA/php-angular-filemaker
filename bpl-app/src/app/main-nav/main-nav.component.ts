import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoginService } from '../../shared/services/login.service';
import { AdminLoginService } from '../../shared/services/admin-login.service';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent {

  isLogIn:boolean = false;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
    
  constructor(

    private breakpointObserver: BreakpointObserver,
    private _loginService: LoginService,
    private _adminService: AdminLoginService,

    ) {
    
  }

  ngOnInit() { 
    this.isLogIn = this._loginService.getIsLoggedIn();
    // alert(this.isLogIn)
  }

  logOut() {

    //destroy all the availabel token
    this._loginService.logout();
    this.isLogIn = false;
  }
  adminLogout() {
    // this._adminService.adminLogout();
  }

}

