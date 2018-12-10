import { Component, OnInit, OnDestroy } from '@angular/core';
import { faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs/Subscription';
import { AdminService } from '../../services/admin/admin.service';
import { TimeMeterState } from '../../entities/timemeterstate';
import { query, keyframes, trigger, transition, animate, style, stagger } from '@angular/animations';
import { Runner } from '../../entities/runner';
import { RunStartDTO } from '../../entities/runstart';
import { Assignment } from '../../entities/assignment';
import { LiveTimerService } from '../../services/livetimer/livetimer.service';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  providers: [LiveTimerService],
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

  faArrow = faLongArrowAltLeft; // arrow icon
  readyState = TimeMeterState.Ready;
  startRun = false; // check if start has been pressed
  hiddenAssignedRunners: boolean[] = []; // array to hide assigned runners
  finishedRunnerList: Runner[] = []; // list of all finshed runners

  // For cleaning up in onDestroy()
  startSubscription: Subscription;
  endSubscription: Subscription;
  measuredStopSubscription: Subscription;

  constructor(public admin: AdminService, public liveTimer: LiveTimerService) {

  }

  ngOnInit() {

    this.admin.connect(); // Connect as Admin on page visit

    // get runnerlist and start time
    this.startSubscription = this.admin.start.subscribe((runDto: RunStartDTO) => {
      this.liveTimer.start(runDto.CurrentTime, runDto.StartTime);
      this.startRun = true;
    });
    // get time of finished runner
    this.measuredStopSubscription = this.admin.measuredStop.subscribe((time) => {
      const runner = new Runner();
      runner.Time = time;
      this.finishedRunnerList.push(runner);
      this.hiddenAssignedRunners.push(false);
    });
    // check if event is finished
    this.endSubscription = this.admin.end.subscribe(end => this.resetRun());

  }
   // Start a race
  onStartRunClicked() {
    this.admin.startRun();
  }
  // assing start number to runner
  onAssignTimeToRunnerClicked(index: number) {
    const finishedRunner = this.finishedRunnerList[index];
    this.hiddenAssignedRunners[index] = true;
    this.admin.assignTime(new Assignment(finishedRunner.Starter, finishedRunner.Time));
  }
  // revert to inital status
  resetRun() {
    this.liveTimer.stop();
    this.startRun = false;
   // this.runnerList = [];
    this.hiddenAssignedRunners = [];
    this.finishedRunnerList = [];
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
