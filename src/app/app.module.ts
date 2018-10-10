import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppComponent } from './app.component';
import { NavigationcardsComponent } from './navigationcards/navigationcards.component';
import { WebsocketService } from './services/websocket/websocket.service';
import { AdminService } from './services/admin/admin.service';
import { ParticipantService } from './services/participant/participant.service';
import { ViewerService } from './services/viewer/viewer.service';



@NgModule({
  declarations: [
    AppComponent,
    NavigationcardsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    FontAwesomeModule
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
