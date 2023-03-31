import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { InitialPageComponent } from './initial-page/initial-page.component';
import { PresentationPageComponent } from './presentation-page/presentation-page.component';
import {MatDialogModule} from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import { LoginDialogComponent } from './presentation-page/components/login-dialog/login-dialog';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SideNavComponent,
    InitialPageComponent,
    PresentationPageComponent,
    LoginDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    FormsModule
  ],
  exports: [
    MatDialogModule,
    MatFormFieldModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
