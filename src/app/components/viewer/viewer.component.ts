import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons';
import { ViewerService } from '../../services/viewer/viewer.service';
import { Router } from '@angular/router';
import {Race} from '../../entities/race';
import { LiveTimerService } from '../../services/livetimer/livetimer.service';

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.css'],
  providers: [LiveTimerService]
})
export class ViewerComponent implements OnInit, OnDestroy {

  faArrow = faLongArrowAltLeft;
  races = new Array<Race>();
  activeRace = "live";

  // For cleaning up in onDestroy
  startSubscription: Subscription;
  endSubscription: Subscription;
  racesSubscription: Subscription;

  constructor(private viewer: ViewerService, private router: Router, private liveTimer: LiveTimerService) { }

  ngOnInit() {
    this.viewer.connect(); // Connect on website visit

    // Check for the start of a race
    this.startSubscription = this.viewer.start.subscribe(ms => {
      this.liveTimer.start(ms.CurrentTime, ms.StartTime);
    });

    // Check for the end of a race
    this.endSubscription = this.viewer.measuredStop.subscribe(() => {
      this.liveTimer.stop();
    });

    // Fetch all races
    this.racesSubscription = this.viewer.races.subscribe(races => {
      this.races = races.sort();
    });
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.startSubscription.unsubscribe();
    this.endSubscription.unsubscribe();
    this.racesSubscription.unsubscribe();

    this.viewer.disconnect();
  }

  selectedRace(id) {
    this.router.navigateByUrl('viewer/(resultlist:old)?raceid=' + id);
    console.log(id);
  }

}
