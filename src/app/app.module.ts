import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Pipe, PipeTransform } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { WebsocketService } from './services/websocket/websocket.service';
import { AdminService } from './services/admin/admin.service';
import { ParticipantService } from './services/participant/participant.service';
import { ViewerService } from './services/viewer/viewer.service';
import { environment } from '../environments/environment';
import { MilliSecondsToTimePipe } from './pipes/millisecondstotimepipe';
import { RegisterparticipantComponent } from './components/registerparticipant/registerparticipant.component';
import { NavigationcardsComponent } from './components/navigationcards/navigationcards.component';
import { HeaderComponent } from './components/header/header.component';
import { AdminComponent } from './components/admin/admin.component';
import { FooterComponent } from './components/footer/footer.component';
import { ViewerComponent } from './components/viewer/viewer.component';
import { PoliciesComponent } from './components/policies/policies.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterparticipantComponent,
    NavigationcardsComponent,
    HeaderComponent,
    AdminComponent,
    FooterComponent,
    MilliSecondsToTimePipe,
    ViewerComponent,
    PoliciesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    FontAwesomeModule,
    RouterModule.forRoot(environment.appRoutes as Routes),
    ReactiveFormsModule
  ],
  providers: [
    WebsocketService,
    AdminService,
    ParticipantService,
    ViewerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
