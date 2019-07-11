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
import { HttpClientModule } from '@angular/common/http';
import { StorageServiceModule} from 'angular-webstorage-service';

import 'hammerjs';
import { ProfileComponent } from './profile/profile.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatButtonModule, MatSidenavModule, MatIconModule, MatListModule ,MatCardModule, MatInputModule, MatTabsModule} from '@angular/material';
import { MatFormFieldModule} from '@angular/material/form-field';
import { Ng2SmartTableModule }from 'ng2-smart-table';
import { CommonTableComponent } from './common-table/common-table.component';
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
    CommonTableComponent
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
  ],
  entryComponents: [
    LoginComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
