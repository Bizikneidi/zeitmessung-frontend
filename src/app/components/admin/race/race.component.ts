import { Component, OnInit, OnDestroy } from '@angular/core';
import { faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs/Subscription';
import { AdminService } from '../../../services/admin/admin.service';
import { LiveTimerService } from '../../../services/livetimer/livetimer.service';
import { Assignment } from '../../../entities/assignment';
import { RaceManagerState } from '../../../entities/racemanagerstate';
import { RunStart } from '../../../entities/runstart';
import { Participant } from '../../../entities/participant';
import { slideAnimation } from '../../../animations/animations';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-race',
  templateUrl: './race.component.html',
  styleUrls: ['./race.component.css'],
  providers: [LiveTimerService],
  animations: [slideAnimation]
})
export class RaceComponent implements OnInit, OnDestroy {

  faArrow = faLongArrowAltLeft; // arrow icon
  readyState = RaceManagerState.Ready;
  runningState = RaceManagerState.Measuring;
  hiddenAssignedParticipants: boolean[] = []; // array to hide assigned participants
  finishedParticipantList: Participant[] = []; // list of all finshed participants
  invalidParticpantList: boolean[] = [];
  // For cleaning up in onDestroy()
  startSubscription: Subscription;
  endSubscription: Subscription;
  measuredStopSubscription: Subscription;

  constructor(public admin: AdminService, public liveTimer: LiveTimerService, public router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.admin.connect(); // Connect as Admin on page visit

    // get participantlist and start time
    this.startSubscription = this.admin.start.subscribe((runDto: RunStart) => {
      this.liveTimer.start(runDto.CurrentTime, runDto.StartTime);
    });
    // get time of finished participant
    this.measuredStopSubscription = this.admin.measuredStop.subscribe((time) => {
      const participant = new Participant();
      participant.Time = time;
      if (this.finishedParticipantList.filter(p => p.Time === time).length <= 0) {
        this.finishedParticipantList.push(participant);
        this.hiddenAssignedParticipants.push(false);
        this.invalidParticpantList.push(false);
      } else {
        const index = this.finishedParticipantList.findIndex(p => p.Time === time);
        this.hiddenAssignedParticipants[index] = false;
        this.invalidParticpantList[index] = true;
      }
    });
    // check if event is finished
    this.endSubscription = this.admin.end.subscribe(() => this.resetRun());

  }
   // Start a race
  onStartRunClicked() {
    this.admin.startRun(Number.parseInt(this.route.snapshot.queryParams.raceid));
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
    this.hiddenAssignedParticipants = [];
    this.finishedParticipantList = [];
    this.admin.disconnect();
    this.router.navigate(['/']);
  }
  // unsubscribe and disconnect from admin
  ngOnDestroy() {
    if (this.startSubscription && !this.startSubscription.closed) {
      this.startSubscription.unsubscribe();
    }
    if (this.endSubscription && !this.endSubscription.closed) {
      this.endSubscription.unsubscribe();
    }
    if (this.measuredStopSubscription && !this.measuredStopSubscription.closed) {
      this.measuredStopSubscription.unsubscribe();
    }
    this.liveTimer.stop();
  }

}
