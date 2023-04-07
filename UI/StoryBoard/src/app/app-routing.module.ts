import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InitialPageComponent } from './initial-page/initial-page.component';
import { PresentationPageComponent } from './presentation-page/presentation-page.component';
import { ProjectWorkPageComponent } from './project-work-page/project-work-page.component';

const routes: Routes = [
  {
    path:'',
    component: PresentationPageComponent
  },
  {
    path:'initial-page',
    component: InitialPageComponent
  },
  {
    path:'project-work',
    component: ProjectWorkPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
