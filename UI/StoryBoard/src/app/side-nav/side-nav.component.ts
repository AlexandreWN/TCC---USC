import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent {
  @Input() sideNavStatus: boolean = false;

  list=[
    {
      number: '1',
      name: 'home',
      icon: 'fa-solid fa-house'
    },
    {
      number: '2',
      name: 'Analytics',
      icon: 'fa-solid fa-chart-line'
    },
    {
      number: '3',
      name: 'Products',
      icon: 'fa-solid fa-box'
    }
  ]
}
