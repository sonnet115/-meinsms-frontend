import {Routes} from '@angular/router';
import {ManageClassesComponent} from './_components/manage-classes/manage-classes.component';
import {ClassDetailsComponent} from './_components/class-details/class-details.component';

export const ClassesRouting: Routes = [
  {
    path: '',
    children: [
      {
        path: 'manage',
        component: ManageClassesComponent
      },
    ]
  },

  {
    path: '',
    children: [
      {
        path: 'details',
        component: ClassDetailsComponent
      },
    ]
  }
];
