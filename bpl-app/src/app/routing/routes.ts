import { Routes } from '@angular/router';
import { ProfileComponent } from '../profile/profile.component';
import { MainNavComponent } from '../main-nav/main-nav.component';
import { SignupLoginComponent } from '../signup-login/signup-login.component';
import { UpdateProfileComponent } from '../profile/update-profile/update-profile.component';
import { AdminComponent } from '../admin/admin.component';
import { AddActivityComponent } from '../activity/add-activity/add-activity.component';
import { AllTasksComponent } from '../table/all-tasks/all-tasks.component';
import { CalenderComponent } from '../profile/calender/calender.component';
import { ActivityDetailModalComponent } from '../activity/activity-detail-modal/activity-detail-modal.component';
import { AllPlayerComponent } from '../table/all-player/all-player.component';

export const routes: Routes = [

    { path: 'profile',   component: ProfileComponent },
    { path: 'all-player', component: AllPlayerComponent},
    { path: 'main-nav', component:MainNavComponent},
    { path: 'signup-login', component: SignupLoginComponent},
    { path: '', redirectTo: 'signup-login', pathMatch: 'full' },
    { path: 'update',  component:UpdateProfileComponent},
    { path: 'admin-login',  component:AdminComponent},
    { path: 'activity',  component:AddActivityComponent},
    { path: 'all-task',  component:AllTasksComponent},
    { path: 'calender',  component:CalenderComponent},
    { path: 'task-detail',  component:ActivityDetailModalComponent},

  ];