import { RegisterparticipantComponent } from '../app/components/registerparticipant/registerparticipant.component';
import { ViewerComponent } from '../app/components/viewer/viewer.component';
import { AdminComponent } from '../app/components/admin/admin.component';
import { PoliciesComponent } from '../app/components/policies/policies.component';
import { NavigationcardsComponent } from '../app/components/navigationcards/navigationcards.component';
import { LiveresultlistComponent } from '../app/components/liveresultlist/liveresultlist.component';
import { ResultlistComponent } from '../app/components/resultlist/resultlist.component';

// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  appRoutes: [
    { path: 'participant', component: RegisterparticipantComponent },
    {
      path: 'viewer',
      component: ViewerComponent,
      children: [
        {
          path: 'live',
          component: LiveresultlistComponent,
          outlet: 'resultlist'
        },
        {
          path: 'old',
          component: ResultlistComponent,
          outlet: 'resultlist'
        }
      ]
    },
    { path: 'admin', component: AdminComponent },
    { path: 'policies', component: PoliciesComponent },
    { path: '**', component: NavigationcardsComponent }
  ]
};
