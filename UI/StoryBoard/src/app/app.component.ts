import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'StoryBoard';
  sideNavStatus: boolean = false;
  public path: string = "";

  constructor(private router : Router) {}

  ngOnInit() {
    this.path =  window.location.href;
  }
}
