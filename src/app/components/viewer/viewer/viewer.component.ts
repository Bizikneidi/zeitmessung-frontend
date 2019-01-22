import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons';
import { ViewerService } from '../../../services/viewer/viewer.service';
import { Router } from '@angular/router';
import { Race } from '../../../entities/race';
import { LiveTimerService } from '../../../services/livetimer/livetimer.service';
import { query } from '@angular/core/src/animation/dsl';


@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.css'],
  providers: [LiveTimerService]
})
export class ViewerComponent implements OnInit, OnDestroy {

  faArrow = faLongArrowAltLeft;
  races = new Array<Race>();
  activeRace = 'live';

  // For cleaning up in onDestroy
  startSubscription: Subscription;
  endSubscription: Subscription;
  racesSubscription: Subscription;

  constructor(public viewer: ViewerService, private router: Router, public liveTimer: LiveTimerService) { }

  ngOnInit() {
    this.viewer.connect(); // Connect on website visit

    // Check for the start of a race
    this.startSubscription = this.viewer.start.subscribe(ms => {
      this.liveTimer.start(ms.CurrentTime, ms.StartTime);
    });

    // Check for the end of a race
    this.endSubscription = this.viewer.end.subscribe(() => {
      this.liveTimer.stop();
    });

    // Fetch all races
    this.racesSubscription = this.viewer.races.subscribe(races => {
      this.races = races.sort((r1, r2) => r2.Date - r1.Date);
    });

    this.activeRace = this.router.url.includes('resultlist:old') ? 'another' : 'live';
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    if (this.startSubscription && !this.startSubscription.closed) {
      this.startSubscription.unsubscribe();
    }
    if (this.endSubscription && !this.endSubscription.closed) {
      this.endSubscription.unsubscribe();
    }
    if (this.racesSubscription && !this.racesSubscription.closed) {
      this.racesSubscription.unsubscribe();
    }

    this.liveTimer.stop();
    this.viewer.disconnect();
  }

  selectedRace(id) {
    this.router.navigateByUrl('viewer/(resultlist:old)?raceid=' + id);
    this.activeRace = 'another';
  }

  changeCurrentRace(id: string) {
    this.activeRace = id;
  }

  onPdfClick() {
    this.viewer.onPdfClick();
  }
}
