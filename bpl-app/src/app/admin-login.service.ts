import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { AdminComponent } from './admin/admin.component';


@Injectable({
  providedIn: 'root'
})
export class AdminLoginService {

  private  _url='http://localhost:8080/v1/admin/login';
  constructor (

      private _http: HttpClient,
      private dialog:MatDialog,

    ) { }

  getLoginResponse(adminData){
    
    return this._http.post<any>(this._url,adminData);
  }

  adminLogin() {

    alert("hello world");
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose=true;
    dialogConfig.autoFocus =  true;
    this.dialog.open(AdminComponent, dialogConfig);
  }
  
  closeAdminModal() {
    alert("Close login modal");
    this.dialog.closeAll();
  }

  adminLogout() {
    localStorage.setItem('admin-token',null);
  }
}

