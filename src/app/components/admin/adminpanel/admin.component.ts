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
  readyState = RaceManagerState.Ready;
  startRun = false; // check if start has been pressed
  hiddenAssignedParticipants: boolean[] = []; // array to hide assigned participants
  finishedParticipantList: Participant[] = []; // list of all finshed participants
  availableRaces: Race[] = [];

  // For cleaning up in onDestroy()
  startSubscription: Subscription;
  endSubscription: Subscription;
  measuredStopSubscription: Subscription;

  constructor(public admin: AdminService, public liveTimer: LiveTimerService) {
  }

  ngOnInit() {

    this.admin.connect(); // Connect as Admin on page visit

    // get participantlist and start time
    this.startSubscription = this.admin.start.subscribe((runDto: RunStart) => {
      this.liveTimer.start(runDto.CurrentTime, runDto.StartTime);
      this.startRun = true;
    });
    // get time of finished participant
    this.measuredStopSubscription = this.admin.measuredStop.subscribe((time) => {
      const participant = new Participant();
      participant.Time = time;
      this.finishedParticipantList.push(participant);
      this.hiddenAssignedParticipants.push(false);
    });
    // check if event is finished
    this.endSubscription = this.admin.end.subscribe(end => this.resetRun());
    // get all available races
    this.admin.availableRace.subscribe(data => this.availableRaces = data);

  }
   // Start a race
  onStartRunClicked() {
    this.admin.startRun();
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
    this.startSubscription.unsubscribe();
    this.endSubscription.unsubscribe();
    this.measuredStopSubscription.unsubscribe();

    this.liveTimer.stop();

    this.admin.disconnect();
  }

}
