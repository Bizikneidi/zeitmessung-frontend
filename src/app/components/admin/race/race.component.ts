import { Component, OnInit, OnDestroy } from '@angular/core';
import { faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs/Subscription';
import { AdminService } from '../../../services/admin/admin.service';
import { LiveTimerService } from '../../../services/livetimer/livetimer.service';
import { Assignment } from '../../../entities/assignment';
import { TimeMeterState } from '../../../entities/timemeterstate';
import { RunStartDTO } from '../../../entities/runstart';
import { Runner } from '../../../entities/runner';

@Component({
  selector: 'app-race',
  templateUrl: './race.component.html',
  styleUrls: ['./race.component.css']
})
export class RaceComponent implements OnInit, OnDestroy {

  faArrow = faLongArrowAltLeft; // arrow icon
  readyState = TimeMeterState.Ready;
  runningState = TimeMeterState.Measuring;
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
