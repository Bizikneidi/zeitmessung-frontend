import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons';
import { ViewerService } from '../../services/viewer/viewer.service';
import { TimeMeterState } from '../../entities/timemeterstate';
import { Router } from '@angular/router';
import {Race} from '../../entities/race';

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.css']
})
export class ViewerComponent implements OnInit, OnDestroy {

  faArrow = faLongArrowAltLeft;

  curResultStationTime = 0; // The result of the current run (is being updated live)
  recOwnTime = 0; // The local time the client received the start packet
  recStationTime = 0; // The station time the client received the start packet
  startStationTime = 0; // The station time when the run was started
  races = new Array<Race>(); // Storing all races;

  measuring: boolean;
  message = 'Lade...';

  // For cleaning up in onDestroy()
  stateSubscription: Subscription;
  startSubscription: Subscription;
  stopSubscription: Subscription;
  racesSubscription: Subscription;

  constructor(private viewer: ViewerService, private router: Router) { }

  ngOnInit() {
    this.viewer.connect(); // Connect on website visit

    // Check for state updates
    this.stateSubscription = this.viewer.state.subscribe(tm => {
      this.measuring = (tm === TimeMeterState.Measuring);
      this.setViewerMessage(tm);
    });

    // Check for the start of a race
    this.startSubscription = this.viewer.start.subscribe(ms => {
      this.recOwnTime = Date.now();
      this.recStationTime = ms.CurrentTime;
      this.startStationTime = ms.StartTime;
    });

    // Check for the end of a race
    this.stopSubscription = this.viewer.stop.subscribe(runner => {
    });

    // Fetch all races
    this.racesSubscription = this.viewer.races.subscribe(races => {
      this.fetchRaces(races);
    });

    // Start live updates for timer
    setInterval(() => {
      if (this.measuring) {
        this.curResultStationTime = this.approximateCurrentStationTime() - this.startStationTime;
      }
    }, 0);
  }

  // Calculates the current time of the station
  approximateCurrentStationTime() {
    const diff = this.recOwnTime - this.recStationTime;
    return Date.now() - diff;
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.stateSubscription.unsubscribe();
    this.startSubscription.unsubscribe();
    this.stopSubscription.unsubscribe();
    this.racesSubscription.unsubscribe();

    this.viewer.disconnect();
  }

  setViewerMessage(tm: TimeMeterState) {
    // Display status to user
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

  getDate(race): string {
    return new Date(race.Date).toDateString();
  }

  fetchRaces(races) {
    this.races = races.sort();
  }

}
