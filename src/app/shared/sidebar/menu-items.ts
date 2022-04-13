import {RouteInfo} from './sidebar.metadata';

export const ROUTES: RouteInfo[] = [
  {
    path: '',
    title: 'Menus',
    icon: 'icon-Bird',
    class: 'nav-small-cap',
    extralink: true,
    submenu: []
  },
  {
    path: '/manage-question-sets',
    title: 'Manage Question Set',
    icon: 'icon-Files',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '/create-questions',
    title: 'Create Question',
    icon: 'icon-Files',
    class: '',
    extralink: false,
    submenu: []
  }
];
