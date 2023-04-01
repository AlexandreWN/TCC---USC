import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InitialPageComponent } from './initial-page/initial-page.component';
import { PresentationPageComponent } from './presentation-page/presentation-page.component';

const routes: Routes = [
  {
    path:'',
    component: PresentationPageComponent
  },
  {
    path:'initial-page',
    component: InitialPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
