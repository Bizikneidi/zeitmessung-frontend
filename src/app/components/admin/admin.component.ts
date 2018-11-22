import { Component, OnInit, OnDestroy} from '@angular/core';
import { faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs/Subscription';
import { AdminService } from '../../services/admin/admin.service';
import { TimeMeterState } from '../../entities/timemeterstate';
import { query, keyframes, trigger, transition, animate, style, stagger } from '@angular/animations';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  animations: [
    trigger('slideAnimation', [
      transition('* => *', [

        query(':enter', style({ opacity: 0 }), {optional: true}),

        query(':enter', stagger('300ms', [
          animate('.6s ease-in', keyframes([
            style({opacity: 0, transform: 'translateY(-75%)', offset: 0}),
            style({opacity: .5, transform: 'translateY(35px)',  offset: 0.3}),
            style({opacity: 1, transform: 'translateY(0)',     offset: 1.0}),
          ]))]), {optional: true}),

      ])
  ])
]
})
export class AdminComponent implements OnInit, OnDestroy {

  faArrow = faLongArrowAltLeft;
  subscription: Subscription;
  notReady = false;
  startRun = false;
  message = 'Lade...';
  runnerlist: number[] = new Array(10).fill(1);
  constructor(public admin: AdminService) {

  }

  ngOnInit() {
    this.admin.connect(); // Connect as Admin on page visit
    this.subscription = this.admin.state.subscribe((data: TimeMeterState) => {
      this.notReady = data !== TimeMeterState.Ready; // Can only press start if the server is ready
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
          break;
        case TimeMeterState.MeasurementRequested:
          this.message = 'Gestartet! Warte auf Server';
          break;
      }
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
    // Clean up
    this.subscription.unsubscribe();
    this.admin.disconnect();
  }

}
