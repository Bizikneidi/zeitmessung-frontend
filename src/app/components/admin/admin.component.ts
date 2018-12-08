import { Component, OnInit, OnDestroy } from '@angular/core';
import { faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs/Subscription';
import { AdminService } from '../../services/admin/admin.service';
import { TimeMeterState } from '../../entities/timemeterstate';
import { query, keyframes, trigger, transition, animate, style, stagger } from '@angular/animations';
import { Runner } from '../../entities/runner';
import { RunStartDTO } from '../../entities/runstart';
import { AssignmentDTO } from '../../entities/assignment';
import { ViewerService } from '../../services/viewer/viewer.service';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  animations: [
    trigger('slideAnimation', [
      transition('* => *', [

        query(':enter', style({ opacity: 0 }), { optional: true }),

        query(':enter', stagger('300ms', [
          animate('.6s ease-in', keyframes([
            style({ opacity: 0, transform: 'translateY(-75%)', offset: 0 }),
            style({ opacity: .5, transform: 'translateY(35px)', offset: 0.3 }),
            style({ opacity: 1, transform: 'translateY(0)', offset: 1.0 }),
          ]))]), { optional: true }),

      ])
    ])
  ]
})
export class AdminComponent implements OnInit, OnDestroy {

  faArrow = faLongArrowAltLeft;
  subscription: Subscription; // status for admin
  runStartSubscription: Subscription; // gives total runners for a race
  measuredStopSubscription: Subscription; // gives time of a runner
  notReady = true;
  startRun = false;
  message = 'Lade...';
  runnerList: Runner[]; // list of all participating runners
  hiddenAssignedRunners: boolean[] = []; // array to hide assigned runners
  finishedRunnerList: Runner[] = []; // list of all finshed runners 
  prevResultStationTime = 0; // The result of the latest completed run
  curResultStationTime = 0; // The result of the current run (is being updated live)
  recOwnTime = 0; // The local time the client received the start packet
  recStationTime = 0; // The station time the client received the start packet
  startStationTime = 0; // The station time when the run was started
  measuring: boolean;
  // For cleaning up in onDestroy()

  startSubscription: Subscription;
  stopSubscription: Subscription;

  constructor(public admin: AdminService, public viewer: ViewerService) {

  }

  ngOnInit() {

    this.admin.connect(); // Connect as Admin on page visit
    this.subscription = this.admin.state.subscribe((data: TimeMeterState) => {

      this.notReady = data !== TimeMeterState.Ready; // Can only press start if the server is ready
      this.measuring = data === TimeMeterState.Measuring;

      // Display correct text
      switch (data) {
        case TimeMeterState.Ready:
          this.message = 'Eine Station ist bereit, drücken Sie START, um zu starten!';
          break;
        case TimeMeterState.Disabled:
          this.message = 'Sie können starten, sobald eine Station verbunden ist.';
          break;
        case TimeMeterState.Measuring:
          this.message = 'Eine Messung ist derzeitig im gange.';
          this.startRun = true;
          break;
        case TimeMeterState.MeasurementRequested:
          this.message = 'Gestartet! Warte auf Server';
          break;
      }
    });
     // get current run and runnerlist
     this.runStartSubscription = this.admin.runStart.subscribe((runDto: RunStartDTO) => {
      this.runnerList = runDto.Runners;
      // alert(JSON.stringify(this.runnerList));
      this.hiddenAssignedRunners.fill(false, 0, this.runnerList.length);
    });
    // get time of finished runner
    this.measuredStopSubscription = this.admin.measuredStop.subscribe((time) => {
      const runner = new Runner();
      runner.Time = time;
      this.finishedRunnerList.push(runner);
      this.hiddenAssignedRunners.push(false);
    });
    this.admin.runEnd.subscribe(end => this.resetRun());
    // time subscriptions
  }

  onStartRunClicked() {
    this.admin.startRun(); // Start a race
    this.startRun = true;
  }

  onAssignTimeToRunnerClicked(index: number) {
    const finishedRunner = this.finishedRunnerList[index];
    alert(JSON.stringify(finishedRunner));
    this.hiddenAssignedRunners[index] = true;
    this.admin.assignTime(new AssignmentDTO(finishedRunner.Starter, finishedRunner.Time));
  }

  resetRun() {
    this.startRun = false;
    this.runnerList = [];
    this.hiddenAssignedRunners = [];
    this.finishedRunnerList = [];
    this.measuring = false;
  }
  ngOnDestroy() {
    // Clean up
    this.subscription.unsubscribe();
    this.runStartSubscription.unsubscribe();
    this.measuredStopSubscription.unsubscribe();

    this.startSubscription.unsubscribe();
    this.stopSubscription.unsubscribe();
    this.viewer.disconnect();
    this.admin.disconnect();
  }

}
