import { NavigationcardsComponent } from '../app/navigationcards/navigationcards.component';
import { AdminComponent } from '../app/admin/admin.component';
import { ViewerComponent } from '../app/viewer/viewer.component';
import {RegisterparticipantComponent} from '../app/registerparticipant/registerparticipant.component';
import { PoliciesComponent } from '../app/policies/policies.component';

export const environment = {
  production: true,
  appRoutes: [
    { path: 'participant', component: RegisterparticipantComponent },
    { path: 'viewer', component: ViewerComponent },
    { path: 'admin', component: AdminComponent },
    { path: 'policies', component: PoliciesComponent },
    { path: '**', component: NavigationcardsComponent }
  ]
};
