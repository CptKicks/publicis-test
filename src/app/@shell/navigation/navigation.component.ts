import { Component } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
  navigationItems: { label: string; destination: string; icon: string }[];
  constructor() {
    this.navigationItems = [
      { label: 'Home', destination: '', icon: 'home.svg' },
      { label: 'Profile', destination: 'profile', icon: 'profile.svg' },
      { label: 'Support', destination: 'support', icon: 'support.svg' },
      { label: 'Admin', destination: 'admin', icon: 'admin.svg' },
    ];
  }
}
