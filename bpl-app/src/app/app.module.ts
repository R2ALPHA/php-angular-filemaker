import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar'; 
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppComponent } from './app.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HeaderComponent } from './header/header.component';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { HttpClientModule ,  HTTP_INTERCEPTORS } from '@angular/common/http';
import { StorageServiceModule} from 'angular-webstorage-service';

import 'hammerjs';
import { ProfileComponent } from './profile/profile.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatButtonModule, MatTableModule, MatSidenavModule, MatIconModule, MatListModule ,MatCardModule, MatInputModule, MatTabsModule ,MatDialogModule} from '@angular/material';
import { MatFormFieldModule} from '@angular/material/form-field';
import { Ng2SmartTableModule }from 'ng2-smart-table';
import { CommonTableComponent } from './common-table/common-table.component';
import { AuthService } from './auth.service';
import { Interceptor } from 'src/shared/interceptor';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { SignupLoginComponent } from './signup-login/signup-login.component';
import { AdminComponent } from './admin/admin.component';
import { PrevalentTableComponent } from './prevalent-table/prevalent-table.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { ScrollDispatchModule} from '@angular/cdk/scrolling';
// import { ScrollDispatcher } from '@angular/cdk/scrolling'; 
import { ScrollingModule} from '@angular/cdk/scrolling';
import { Scroll } from '@angular/router';
import { BasicScrollComponent } from './basic-scroll/basic-scroll.component';
import { ScrollComponent } from './scroll/scroll.component';


// import { SmartTableComponent } from "./smart-data-table/smart-data-table.component";

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    ProfileComponent,
    MainNavComponent,
    CommonTableComponent,
    AdminLoginComponent,
    SignupLoginComponent,
    AdminComponent,
    PrevalentTableComponent,
    BasicScrollComponent,
    ScrollComponent ,

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
    // ScrollDispatcher
    ScrollDispatchModule,
  ],
  entryComponents: [
    AdminComponent
  ],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
