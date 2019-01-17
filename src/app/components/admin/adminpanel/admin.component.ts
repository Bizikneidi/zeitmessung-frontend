import { Component, OnInit, OnDestroy } from '@angular/core';
import { faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs/Subscription';
import { AdminService } from '../../../services/admin/admin.service';
import { RaceManagerState } from '../../../entities/racemanagerstate';
import { query, keyframes, trigger, transition, animate, style, stagger } from '@angular/animations';
import { Participant } from '../../../entities/participant';
import { RunStart } from '../../../entities/runstart';
import { Assignment } from '../../../entities/assignment';
import { Race } from '../../../entities/race';
import { LiveTimerService } from '../../../services/livetimer/livetimer.service';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  providers: [LiveTimerService]
})
export class AdminComponent implements OnInit, OnDestroy {

  faArrow = faLongArrowAltLeft; // arrow icon
 
  startRun = false; // check if start has been pressed

  availableRaces: Race[] = []; // list of all available races

  availableRaceSubscribtion: Subscription;

  constructor(public admin: AdminService, public liveTimer: LiveTimerService) {
  }

  ngOnInit() {

    this.admin.connect(); // Connect as Admin on page visit
    // get all available races
    this.availableRaceSubscribtion = this.admin.availableRace.subscribe(data => this.availableRaces = data);

  }

  // on race selected
  onSelected(id: number) {
    this.admin.selectRace(+id);
  }

   // Start a race
  onStartRunClicked() {
    if (this.raceToStart === -1) {
      this.admin.startRun(12);
    }
  }
  // assing start number to participant
  onAssignTimeToParticipantClicked(index: number) {
    const finishedParticipant = this.finishedParticipantList[index];
    this.hiddenAssignedParticipants[index] = true;
    this.admin.assignTime(new Assignment(finishedParticipant.Starter, finishedParticipant.Time));
  }
  // revert to inital status
  resetRun() {
    this.liveTimer.stop();
    this.startRun = false;
   // this.participantList = [];
    this.hiddenAssignedParticipants = [];
    this.finishedParticipantList = [];
  }
  // unsubscribe and disconnect from admin
  ngOnDestroy() {
    if (this.availableRaceSubscribtion && !this.availableRaceSubscribtion.closed) {
      this.availableRaceSubscribtion.unsubscribe();
    }
  }

}
