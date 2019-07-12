import { Routes } from '@angular/router';
import { SignUpComponent } from '../sign-up/sign-up.component';
import { LoginComponent } from '../login/login.component';
import { ProfileComponent } from '../profile/profile.component';
import { CommonTableComponent } from '../common-table/common-table.component';
import { MainNavComponent } from '../main-nav/main-nav.component';

export const routes: Routes = [
    { path: 'signup',  component: SignUpComponent },
    { path: 'login',   component: LoginComponent },
    { path: 'profile',   component: ProfileComponent },
    { path: 'table', component: CommonTableComponent },
    { path: 'main-nav', component:MainNavComponent},
    { path: '', redirectTo: '/signup', pathMatch: 'full' }
  ];