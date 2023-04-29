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
import { ProjectWorkPageComponent } from './project-work-page/project-work-page.component';
import {MatSelectModule} from '@angular/material/select';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { StoryDialogComponent } from './project-work-page/components/story-dialog/story-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SideNavComponent,
    InitialPageComponent,
    PresentationPageComponent,
    LoginDialogComponent,
    ProjectWorkPageComponent,
    StoryDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    FormsModule,
    MatSelectModule,
    MatExpansionModule,
    MatIconModule,
    DragDropModule
  ],
  exports: [
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    MatSelectModule,
    MatExpansionModule,
    MatIconModule,
    DragDropModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
