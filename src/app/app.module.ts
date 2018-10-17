import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Pipe, PipeTransform } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { NavigationcardsComponent } from './navigationcards/navigationcards.component';
import { RegisterparticipantComponent } from './registerparticipant/registerparticipant.component';
import { WebsocketService } from './services/websocket/websocket.service';
import { AdminService } from './services/admin/admin.service';
import { ParticipantService } from './services/participant/participant.service';
import { ViewerService } from './services/viewer/viewer.service';
import { HeaderComponent } from './header/header.component';
import { AdminComponent } from './admin/admin.component';
import { ViewerComponent } from './viewer/viewer.component';
import { environment } from '../environments/environment';
import { FooterComponent } from './footer/footer.component';
import { MilliSecondsToTimePipe } from './pipes/millisecondstotimepipe';
import { PoliciesComponent } from './policies/policies.component';

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
