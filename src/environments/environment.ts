import { RegisterparticipantComponent } from '../app/components/participant/registerparticipant/registerparticipant.component';
import { ViewerComponent } from '../app/components/viewer/viewer/viewer.component';
import { AdminComponent } from '../app/components/admin/adminpanel/admin.component';
import { PoliciesComponent } from '../app/components/general/policies/policies.component';
import { NavigationcardsComponent } from '../app/components/general/navigationcards/navigationcards.component';
import { LiveresultlistComponent } from '../app/components/viewer/liveresultlist/liveresultlist.component';
import { ResultlistComponent } from '../app/components/viewer/resultlist/resultlist.component';
import { CompetitionComponent } from '../app/components/admin/competition/competition.component';
import { RaceComponent } from '../app/components/admin/race/race.component';
import { Routes } from '@angular/router';
import { ParticipantracechooserComponent } from '../app/components/participant/participantracechooser/participantracechooser.component';

// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  appRoutes: [
    { path: 'participant/:id', component: RegisterparticipantComponent },
    {
      path: 'admin', component: AdminComponent
    },
    {path: 'admin/competition', pathMatch: 'full', component: CompetitionComponent},
    {path: 'admin/race', pathMatch: 'full', component: RaceComponent},
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

    { path: 'policies', component: PoliciesComponent },
    { path: 'chooserace', component: ParticipantracechooserComponent },
    { path: '**', component: NavigationcardsComponent }
  ]
};
