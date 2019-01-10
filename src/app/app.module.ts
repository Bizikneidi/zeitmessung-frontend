import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, Pipe, PipeTransform } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule, Routes } from '@angular/router';

import { ContentComponent } from './components/content/content.component';
import { WebsocketService } from './services/websocket/websocket.service';
import { AdminService } from './services/admin/admin.service';
import { ParticipantService } from './services/participant/participant.service';
import { ViewerService } from './services/viewer/viewer.service';
import { environment} from '../environments/environment';
import { MilliSecondsToTimePipe } from './pipes/millisecondstotimepipe';
import { RegisterparticipantComponent } from './components/registerparticipant/registerparticipant.component';
import { NavigationcardsComponent } from './components/navigationcards/navigationcards.component';
import { HeaderComponent } from './components/header/header.component';
import { AdminComponent } from './components/admin/adminpanel/admin.component';
import { FooterComponent } from './components/footer/footer.component';
import { ViewerComponent } from './components/viewer/viewer.component';
import { PoliciesComponent } from './components/policies/policies.component';
import { LiveresultlistComponent } from './components/liveresultlist/liveresultlist.component';
import { ResultlistComponent } from './components/resultlist/resultlist.component';
import { StateToTextPipe } from './pipes/statetotextpipe';
import { RaceToStringPipe } from './pipes/racetostringpipe';
import { LiveresultService } from './services/liveresult/liveresult.service';
import { CompetitionComponent } from './components/admin/competition/competition.component';
import { RaceComponent } from './components/admin/race/race.component';
import { ParticipantracechooserComponent } from './components/participantracechooser/participantracechooser.component';
import { SexEnglishToGermanPipe } from './pipes/sexenglishtogermanpipe.pipe';
import { ParticipantToRankPipe, ParticipantToSexRankPipe } from './pipes/participanttorankpipe';

@NgModule({
  declarations: [
    ContentComponent,
    RegisterparticipantComponent,
    NavigationcardsComponent,
    HeaderComponent,
    AdminComponent,
    CompetitionComponent,
    RaceComponent,
    FooterComponent,
    MilliSecondsToTimePipe,
    StateToTextPipe,
    RaceToStringPipe,
    ParticipantToRankPipe,
    ParticipantToSexRankPipe,
    ViewerComponent,
    PoliciesComponent,
    LiveresultlistComponent,
    ResultlistComponent,
    CompetitionComponent,
    RaceComponent,
    ResultlistComponent,
    SexEnglishToGermanPipe,
    ParticipantracechooserComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    FontAwesomeModule,
    RouterModule.forRoot(environment.appRoutes as Routes)
  ],
  providers: [
    WebsocketService,
    AdminService,
    ParticipantService,
    ViewerService,
    LiveresultService,
    ParticipantToRankPipe,
    ParticipantToSexRankPipe,
    MilliSecondsToTimePipe,
    RaceToStringPipe,
    SexEnglishToGermanPipe
  ],
  bootstrap: [ContentComponent]
})
export class AppModule { }
