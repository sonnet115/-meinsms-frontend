import {Routes} from '@angular/router';

import {FullComponent} from './shared/layouts/full/full.component';
import {BlankComponent} from './shared/layouts/blank/blank.component';
import {AuthGuard} from './_guards/auth.guard';
import {LandingPageComponent} from './landing-page/landing-page.component';

export const Approutes: Routes = [
  {
    path: '',
    component: BlankComponent,
    children: [
      {path: '', redirectTo: '/home', pathMatch: 'full'},
    ]
  },
  {
    path: '',
    component: BlankComponent,
    children: [
      {path: '', redirectTo: '/authentication/login', pathMatch: 'full'},
      {
        path: 'authentication',
        loadChildren:
          () => import('./_modules/authentication/authentication.module').then(m => m.AuthenticationModule)
      }
    ]
  },
  {
    path: '',
    component: BlankComponent,
    children: [
      {
        path: 'home',
        component: LandingPageComponent
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/authentication/404'
  }
];
