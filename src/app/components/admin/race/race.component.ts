import { Component, OnInit, OnDestroy, ChangeDetectorRef, AfterContentChecked } from '@angular/core';
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
export class RaceComponent implements OnInit, OnDestroy, AfterContentChecked {

  /**
   *left arrow icon
   *
   * @memberof RaceComponent
   */
  faArrow = faLongArrowAltLeft;

  readyState = RaceManagerState.Ready;
  runningState = RaceManagerState.Measuring;

  /**
   *array to hide assigned participants
   *
   * @type {boolean[]}
   * @memberof RaceComponent
   */
  hiddenAssignedParticipants: boolean[] = [];
  /**
   *list of all finshed participants
   *
   * @type {Participant[]}
   * @memberof RaceComponent
   */
  finishedParticipantList: Participant[] = [];
  /**
   *index for autoselect
   *
   * @type {number}
   * @memberof RaceComponent
   */
  currentListIndex: number;
  startSubscription: Subscription;
  endSubscription: Subscription;
  measuredStopSubscription: Subscription;

  /**
   *Creates an instance of RaceComponent.
   * @param {AdminService} admin
   * @param {LiveTimerService} liveTimer
   * @param {Router} router
   * @param {ActivatedRoute} route
   * @param {ChangeDetectorRef} cdref
   * @memberof RaceComponent
   */
  constructor(public admin: AdminService, public liveTimer: LiveTimerService, public router: Router, private route: ActivatedRoute,
    private cdref: ChangeDetectorRef) {
  }

  ngOnInit() {
    // Connect as Admin on page visit
    this.admin.connect();
    this.currentListIndex = 0;
    // get current and start time from station
    this.startSubscription = this.admin.start.subscribe((runDto: RunStart) => {
      // start the timer
      this.liveTimer.start(runDto.CurrentTime, runDto.StartTime);
      // set current index to zero
      this.currentListIndex = 0;
      // fill list of already assigned participants and hide them on the frontend => important to show rank
      // increase current index for every assigned participant => important for autofocus
      runDto.Participants.forEach(p => {
        if (p.Time > 0) {
          this.finishedParticipantList.push(p);
          this.hiddenAssignedParticipants.push(true);
          this.currentListIndex++;
        } else {
          this.hiddenAssignedParticipants.push(false);
        }
      });
    });
    // get time of a finished participant and add to finishedParticipantList if particpant is not in list yet
    // if participant is already in list then show the participant again and
    // reduce the currentListIndex by one => means that user assigned participant with wrong startnumber
    this.measuredStopSubscription = this.admin.measuredStop.subscribe((time) => {
      const participant = new Participant();
      participant.Time = time;
      if (this.finishedParticipantList.filter(p => p.Time === time).length <= 0) {
        this.finishedParticipantList.push(participant);
        this.hiddenAssignedParticipants.push(false);
      } else {
        const index = this.finishedParticipantList.findIndex(p => p.Time === time);
        this.hiddenAssignedParticipants[index] = false;

        if (index === this.currentListIndex - 1) {
          setTimeout(() => {
            this.currentListIndex--;
        }, 1);
        }
      }
    });
    // check if event is finished
    this.endSubscription = this.admin.end.subscribe(() => this.resetRun());

  }

  /**
   *starts a race
   *
   * @memberof RaceComponent
   */
  onStartRunClicked() {
    this.admin.startRun(Number.parseInt(this.route.snapshot.queryParams.raceid));
  }

  /**
   *assing start number to participant, hide the participant and jump to the next participant (autofocus) with currentListIndex++
   *
   * @param {number} index
   * @memberof RaceComponent
   */
  onAssignTimeToParticipantClicked(index: number) {
    const finishedParticipant = this.finishedParticipantList[index];
    this.hiddenAssignedParticipants[index] = true;
    this.currentListIndex++;
    this.admin.assignTime(new Assignment(finishedParticipant.Starter, finishedParticipant.Time));
  }

  /**
   *revert to inital status
   *
   * @memberof RaceComponent
   */
  resetRun() {
    this.liveTimer.stop();
    this.hiddenAssignedParticipants = [];
    this.finishedParticipantList = [];
    this.currentListIndex = 0;
    this.admin.disconnect();
    this.router.navigate(['/']);
  }

  /**
   *unsubscribe and disconnect from admin
   *
   * @memberof RaceComponent
   */
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

  ngAfterContentChecked() {
    this.cdref.detectChanges();
  }

}
