import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons';
import { MeasurementStart } from '../../entities/measurementstart';
import { ViewerService } from '../../services/viewer/viewer.service';
import { TimeMeterState } from '../../entities/timemeterstate';

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.css']
})
export class ViewerComponent implements OnInit, OnDestroy {

  faArrow = faLongArrowAltLeft;
  prevTime = 0;
  curTime = 0;
  recTime = 0;
  measuring: boolean;
  message = 'Lade...';

  mesStart: MeasurementStart;
  stopNum: number;

  stateSubscription: Subscription;
  startSubscription: Subscription;
  stopSubscription: Subscription;

  constructor(private viewer: ViewerService) { }

  ngOnInit() {
    this.viewer.connect();

    this.stateSubscription = this.viewer.state.subscribe(tm => {
      this.measuring = (tm === TimeMeterState.Measuring);
      this.setViewerMessage(tm);
    });

    this.startSubscription = this.viewer.start.subscribe(ms => {
      this.mesStart = ms;
      this.recTime = Date.now();
    });

    this.stopSubscription = this.viewer.stop.subscribe(sn => {
      this.stopNum = sn;
      this.prevTime = sn - this.mesStart.StartTime;
      this.curTime = 0;
    });

    setInterval(() => {
      if (this.measuring) {
        this.curTime = this.approximateCurrentTime() - this.mesStart.StartTime;
      }
    }, 0);
  }

  approximateCurrentTime() {
    const diff = this.recTime - this.mesStart.CurrentTime;
    return Date.now() - diff;
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.stateSubscription.unsubscribe();
    this.startSubscription.unsubscribe();
    this.stopSubscription.unsubscribe();

    this.viewer.disconnect();
  }

  setViewerMessage(tm: TimeMeterState) {
    switch (tm) {
      case TimeMeterState.Ready:
        this.message = 'Eine Station ist bereit, warte auf Admin.';
        break;
      case TimeMeterState.Measuring:
        this.message = 'Eine Messung ist derzeitig im gange.';
        break;
      case TimeMeterState.MeasurementRequested:
        this.message = 'Warte auf Server.';
        break;
      case TimeMeterState.Disabled:
        this.message = 'Warte auf Station.';
        break;
    }
  }
}
