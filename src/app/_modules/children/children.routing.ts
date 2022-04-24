import {Routes} from '@angular/router';
import {ChildComponent} from './_components/child/child.component';
import {AuthGuard} from '../../_guards/auth.guard';
import {ChildClassesComponent} from './_components/child-classes/child-classes.component';

export const ChildrenRouting: Routes = [
  {
    path: '',
    children: [
      {
        path: 'manage',
        component: ChildComponent,
        canActivate: [AuthGuard]
      },
    ]
  },
  {
    path: '',
    children: [
      {
        path: 'classes',
        component: ChildClassesComponent,
        canActivate: [AuthGuard]
      },
    ]
  }
];
