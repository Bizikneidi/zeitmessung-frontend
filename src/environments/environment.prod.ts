import { NavigationcardsComponent } from '../app/navigationcards/navigationcards.component';
import { AdminComponent } from '../app/admin/admin.component';
import { ViewerComponent } from '../app/viewer/viewer.component';
import {RegisterparticipantComponent} from '../app/registerparticipant/registerparticipant.component';

export const environment = {
  production: true,
  appRoutes: [
    { path: 'participant', component: RegisterparticipantComponent },
    { path: 'viewer', component: ViewerComponent },
    { path: 'admin', component: AdminComponent },
    { path: '**', component: NavigationcardsComponent }
  ]
};
