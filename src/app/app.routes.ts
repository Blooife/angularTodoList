import { Routes } from '@angular/router';
import {TasksListComponent} from './components/tasks-list.component/tasks-list.component';
import {SettingsComponent} from './components/settings.component/settings.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: TasksListComponent,
    title: 'Home page'
  },
  {
    path: 'settings',
    component: SettingsComponent,
    title: 'Settings page'
  }
];
