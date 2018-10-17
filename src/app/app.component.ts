import { Component } from '@angular/core';
import { sidenavMenuItems, SideNavItem } from './side-nav-menuitems';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Rahhams Admin';
  sideNavMenuItems: SideNavItem[];

  constructor() {
    this.sideNavMenuItems = sidenavMenuItems;
  }
}

