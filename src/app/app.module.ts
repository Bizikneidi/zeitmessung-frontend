import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Pipe } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { NavigationcardsComponent } from './navigationcards/navigationcards.component';
import { WebsocketService } from './services/websocket/websocket.service';
import { AdminService } from './services/admin/admin.service';
import { ParticipantService } from './services/participant/participant.service';
import { ViewerService } from './services/viewer/viewer.service';
import { HeaderComponent } from './header/header.component';
import { AdminComponent } from './admin/admin.component';
import { ViewerComponent } from './viewer/viewer.component';
import { environment } from '../environments/environment';


@Pipe({
  name: "milliSecondsToTime"
})
class MilliSecondsToTimePipe {
  transform(value: number, deciMil: boolean = false): string {
    if (typeof value !== "number" || value < 0){
      return "invalid number";
    }
    let deciSeconds = Math.floor((value / 100) % 10),
    seconds = Math.floor((value / 1000) % 60),
    minutes = Math.floor((value / (1000*60)) % 60),
    hours = Math.floor(value / (1000*60*60));
    if(deciMil){
      return this.padTime(deciSeconds);
    }
    return this.padTime(hours) + ":" + this.padTime(minutes) + ":" + this.padTime(seconds);
  };

  padTime(t) {
    return t < 10 ? "0" + t : t;
  }
}

@NgModule({
  declarations: [
    AppComponent,
    NavigationcardsComponent,
    HeaderComponent,
    AdminComponent,
    ViewerComponent,
    MilliSecondsToTimePipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    FontAwesomeModule,
    RouterModule.forRoot(environment.appRoutes as Routes)
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
