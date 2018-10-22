import { RegisterparticipantComponent } from '../app/components/registerparticipant/registerparticipant.component';
import { ViewerComponent } from '../app/components/viewer/viewer.component';
import { AdminComponent } from '../app/components/admin/admin.component';
import { PoliciesComponent } from '../app/components/policies/policies.component';
import { NavigationcardsComponent } from '../app/components/navigationcards/navigationcards.component';

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
