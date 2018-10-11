import { NavigationcardsComponent } from '../app/navigationcards/navigationcards.component';
import { AdminComponent } from '../app/admin/admin.component';
import { ViewerComponent } from '../app/viewer/viewer.component';

export const environment = {
  production: true,
  appRoutes: [
    { path: 'participant', component: ViewerComponent },
    { path: 'viewer', component: ViewerComponent },
    { path: 'admin', component: AdminComponent },
    { path: '**', component: NavigationcardsComponent }
  ]
};
