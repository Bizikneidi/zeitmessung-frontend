import { Component, OnInit, OnDestroy } from '@angular/core';
import { faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons';
import { AdminService } from '../services/admin/admin.service';
import { TimeMeterState } from '../entities/timemeterstate';
import { Subscription } from 'rxjs/Subscription';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit, OnDestroy {

  faArrow = faLongArrowAltLeft;
  notReady = true;
  subscription: Subscription;
  message = 'Lade...';

  constructor(public service: AdminService) { }

  ngOnInit() {
     this.subscription = this.service.state.subscribe((data: TimeMeterState) => {
        if (data === TimeMeterState.Ready) {
          this.notReady = false;
          this.message = 'Eine Station ist bereit, drücken Sie START, um zu starten!';
        } else if (data === TimeMeterState.Measuring) {
          this.notReady = true;
          this.message = 'Eine Messung ist derzeitig im gange.';
        } else if (data === TimeMeterState.Disabled) {
          this.notReady = true;
          this.message = 'Sie können starten, sobald eine Station verbunden ist.';
        }
     });
  }

  onStartRunClicked() {
    this.service.startRun();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.service.disconnect();
  }
}
