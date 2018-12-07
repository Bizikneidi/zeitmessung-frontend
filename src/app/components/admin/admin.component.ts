import { Component, OnInit, OnDestroy } from '@angular/core';
import { faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs/Subscription';
import { AdminService } from '../../services/admin/admin.service';
import { TimeMeterState } from '../../entities/timemeterstate';
import { query, keyframes, trigger, transition, animate, style, stagger } from '@angular/animations';
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

  faArrow = faLongArrowAltLeft;
  readyState = TimeMeterState.Ready;
  startRun = false;
  runnerlist: number[] = new Array(10).fill(1);

  // For cleaning up in onDestroy
  startSubscription: Subscription;
  endSubscription: Subscription;

  constructor(public admin: AdminService, private liveTimer: LiveTimerService) {

  }

  ngOnInit() {
    this.admin.connect(); // Connect as Admin on page visit

    // Check for the start of a race
    this.startSubscription = this.admin.start.subscribe(ms => {
      this.liveTimer.start(ms.CurrentTime, ms.StartTime);
    });

    // Check for the end of a race
    this.endSubscription = this.admin.measuredStop.subscribe(() => {
      this.liveTimer.stop();
    });
  }

  onStartRunClicked() {
    this.admin.startRun(); // Start a race
    this.startRun = true;
  }

  onRunnerFinishedClicked(index: number) {
    this.runnerlist.splice(index, 1);
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.startSubscription.unsubscribe();
    this.endSubscription.unsubscribe();

    // Clean up
    this.admin.disconnect();
  }

}
