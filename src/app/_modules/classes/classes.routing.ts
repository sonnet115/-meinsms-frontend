import {Routes} from '@angular/router';
import {ManageClassesComponent} from './_components/manage-classes/manage-classes.component';

export const ClassesRouting: Routes = [
  {
    path: '',
    children: [
      {
        path: 'classes',
        component: ManageClassesComponent
      },
    ]
  }
];
