import { RegisterparticipantComponent } from '../app/components/participant/registerparticipant/registerparticipant.component';
import { ViewerComponent } from '../app/components/viewer/viewer/viewer.component';
import { AdminComponent } from '../app/components/admin/adminpanel/admin.component';
import { PoliciesComponent } from '../app/components/general/policies/policies.component';
import { NavigationcardsComponent } from '../app/components/general/navigationcards/navigationcards.component';
import { LiveresultlistComponent } from '../app/components/viewer/liveresultlist/liveresultlist.component';
import { ResultlistComponent } from '../app/components/viewer/resultlist/resultlist.component';
import { CompetitionComponent } from '../app/components/admin/competition/competition.component';
import { RaceComponent } from '../app/components/admin/race/race.component';
import { ParticipantracechooserComponent } from '../app/components/participant/participantracechooser/participantracechooser.component';

export const environment = {
  production: true,
  appRoutes: [
    { path: 'participant/:id', component: RegisterparticipantComponent },
    {
      path: 'viewer', component: ViewerComponent,
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
    {
      path: 'admin', component: AdminComponent
    },
    {path: 'admin/competition', pathMatch: 'full', component: CompetitionComponent},
    {path: 'admin/race', pathMatch: 'full', component: RaceComponent},
    { path: 'policies', component: PoliciesComponent },
    { path: 'chooserace', component: ParticipantracechooserComponent },
    { path: '**', component: NavigationcardsComponent }
  ]
};
