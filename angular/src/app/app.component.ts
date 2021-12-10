import { Component } from '@angular/core';
import { RoutesService, eLayoutType } from '@abp/ng.core';

import { NavItemsService } from '@abp/ng.theme.shared';
import { ReviewButtonComponent } from './review-button/review-button.component';
@Component({
  selector: 'app-root',
  template: `
    <abp-loader-bar></abp-loader-bar>
    <abp-dynamic-layout></abp-dynamic-layout>
  `,
})
export class AppComponent {
  constructor(
    private navItems: NavItemsService,
  ){
    
  }
  ngOnInit(): void {
    this.navItems.addItems([
      {
        id:"reviewCount",
        component:  ReviewButtonComponent,
        order: 5,
      }
    ])
    
    
  }

}
