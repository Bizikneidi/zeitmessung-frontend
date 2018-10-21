import { Component, OnInit, OnDestroy } from '@angular/core';
import { faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs/Subscription';
import { AdminService } from '../../services/admin/admin.service';
import { TimeMeterState } from '../../entities/timemeterstate';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit, OnDestroy {

  faArrow = faLongArrowAltLeft;
  subscription: Subscription;
  notReady = true;
  message = 'Lade...';

  constructor(public admin: AdminService) { }

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
  }

  ngOnDestroy() {
    // Clean up
    this.subscription.unsubscribe();
    this.admin.disconnect();
  }
}
