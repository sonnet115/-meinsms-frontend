import {Routes} from '@angular/router';
import {Dashboard3Component} from './dashboard3/dashboard3.component';
import {ProfileComponent} from './profile/profile.component';

export const DashboardRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'home',
        component: Dashboard3Component,
        data: {
          title: 'Docasigner',
          urls: [
            {title: 'dashboard', url: '/dashboard/home'},
            {title: 'home'}
          ]
        }
      },
      {
        path: 'edit-profile',
        component: ProfileComponent,
        data: {
          title: 'edit_profile',
          urls: [
            {title: 'profile', url: '/dashboard/edit-profile'},
            {title: 'edit'}
          ]
        }
      }
    ]
  }
];
