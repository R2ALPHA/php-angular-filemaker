import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar'; 
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppComponent } from './app.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from './footer/footer.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { HttpClientModule ,  HTTP_INTERCEPTORS } from '@angular/common/http';
import { StorageServiceModule} from 'angular-webstorage-service';
import { CommonModule } from '@angular/common';
import { FlatpickrModule } from 'angularx-flatpickr';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

import 'hammerjs';
import 'flatpickr/dist/flatpickr.css'
import { ProfileComponent } from './profile/profile.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatButtonModule, MatTableModule, MatSidenavModule, MatIconModule, MatListModule ,MatCardModule, MatInputModule, MatTabsModule ,MatDialogModule, MatDialogRef} from '@angular/material';
import { MatFormFieldModule} from '@angular/material/form-field';
import { Ng2SmartTableModule }from 'ng2-smart-table';
import { AuthService } from './auth.service';
import { Interceptor } from 'src/shared/interceptor';
import { SignupLoginComponent } from './signup-login/signup-login.component';
import { AdminComponent } from './admin/admin.component';
import { PrevalentTableComponent } from './prevalent-table/prevalent-table.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { ScrollDispatchModule} from '@angular/cdk/scrolling';

import { ScrollingModule} from '@angular/cdk/scrolling';
import { Scroll } from '@angular/router';
import { BasicScrollComponent } from './basic-scroll/basic-scroll.component';
import { ScrollComponent } from './scroll/scroll.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatNativeDateModule } from '@angular/material';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { AssignedTaskComponent } from './assigned-task/assigned-task.component';
import { AddActivityComponent } from './add-activity/add-activity.component';
import { AllTasksComponent } from './all-tasks/all-tasks.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { DecimalPipe } from '@angular/common';
import { DatePipe } from '@angular/common';
import { CalenderComponent } from './calender/calender.component';
import { AllDetailComponent } from './all-detail/all-detail.component';
import { FileUploadModule } from "ng2-file-upload";
import { FeedComponent } from './feed/feed.component';
import { ConfirmDialogueComponent } from './confirm-dialogue/confirm-dialogue.component';
import { ActivityDetailModalComponent } from './activity-detail-modal/activity-detail-modal.component';
import { MatTooltipModule } from '@angular/material/tooltip'
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ObservableExample1Component } from './observable-example1/observable-example1.component';
import { ObservableExample2Component } from './observable-example2/observable-example2.component';

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    FooterComponent,
    ProfileComponent,
    MainNavComponent,
    SignupLoginComponent,
    AdminComponent,
    PrevalentTableComponent,
    BasicScrollComponent,
    ScrollComponent,
    UpdateProfileComponent,
    AssignedTaskComponent,
    AddActivityComponent,
    AllTasksComponent,
    CalenderComponent,
    AllDetailComponent,
    FeedComponent,
    ConfirmDialogueComponent,
    ActivityDetailModalComponent,
    ObservableExample1Component,
    ObservableExample2Component ,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    FlexLayoutModule,
    MatSelectModule,
    MatSlideToggleModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    StorageServiceModule,
    LayoutModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    MatTabsModule,
    Ng2SmartTableModule,
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    ScrollDispatchModule,
    MatRadioModule,
    MatNativeDateModule,
    MatDatepickerModule,
    NgbModule,
    CommonModule,
    NgbModalModule,
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    FileUploadModule,
    MatTooltipModule,
    MatButtonToggleModule,
    MatCheckboxModule,
    
  ],
  entryComponents: [
    AdminComponent,
    ConfirmDialogueComponent,
    AddActivityComponent,
    
  ],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi:true
    },
    DecimalPipe,
    DatePipe,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
