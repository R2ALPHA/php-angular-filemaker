import { Routes } from '@angular/router';
import { SignUpComponent } from '../sign-up/sign-up.component';
import { ProfileComponent } from '../profile/profile.component';
import { MainNavComponent } from '../main-nav/main-nav.component';
import { SignupLoginComponent } from '../signup-login/signup-login.component';
import { PrevalentTableComponent } from '../prevalent-table/prevalent-table.component';
import { BasicScrollComponent } from '../../demo/basic-scroll/basic-scroll.component';
import { UpdateProfileComponent } from '../profile/update-profile/update-profile.component';
import { AdminComponent } from '../admin/admin.component';
import { AssignedTaskComponent } from '../assigned-task/assigned-task.component';
import { AddActivityComponent } from '../add-activity/add-activity.component';
import { AllTasksComponent } from '../all-tasks/all-tasks.component';
import { CalenderComponent } from '../profile/calender/calender.component';
import { ActivityDetailModalComponent } from '../activity-detail-modal/activity-detail-modal.component';

export const routes: Routes = [

    { path: 'signup',  component: SignUpComponent },
    { path: 'profile',   component: ProfileComponent },
    { path: 'prev-table', component: PrevalentTableComponent},
    { path: 'main-nav', component:MainNavComponent},
    { path: 'signup-login', component: SignupLoginComponent},
    { path: '', redirectTo: '/signup', pathMatch: 'full' },
    { path: 'update',  component:UpdateProfileComponent},
    { path: 'admin-login',  component:AdminComponent},
    { path: 'add-task',  component:AssignedTaskComponent},
    { path: 'activity',  component:AddActivityComponent},
    { path: 'all-task',  component:AllTasksComponent},
    { path: 'calender',  component:CalenderComponent},
    { path: 'task-detail',  component:ActivityDetailModalComponent},

  ];