import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons';
import { ViewerService } from '../../../services/viewer/viewer.service';
import { Router, ActivatedRoute } from '@angular/router';
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
  /**
   *list of all races
   *
   * @memberof ViewerComponent
   */
  races = new Array<Race>();
  /**
   *id of selected startrace or
   *'live' if live resultlist
   * @memberof ViewerComponent
   */
  activeRace = 'live';

  startSubscription: Subscription;
  endSubscription: Subscription;
  racesSubscription: Subscription;
  queryParamMapSubscription: Subscription;

  /**
   *Creates an instance of ViewerComponent.
   * @param {ViewerService} viewer
   * @param {Router} router
   * @param {ActivatedRoute} route
   * @param {LiveTimerService} liveTimer
   * @memberof ViewerComponent
   */
  constructor(public viewer: ViewerService, private router: Router, private route: ActivatedRoute, public liveTimer: LiveTimerService) { }

  ngOnInit() {
    this.viewer.connect(); // Connect on website visit

    // Check for the start of a startrace
    this.startSubscription = this.viewer.start.subscribe(ms => {
      this.liveTimer.start(ms.CurrentTime, ms.StartTime);
    });

    // Check for the end of a startrace
    this.endSubscription = this.viewer.end.subscribe(() => {
      this.liveTimer.stop();
    });

    // Fetch all races
    this.racesSubscription = this.viewer.races.subscribe(races => {
      this.races = races.sort((r1, r2) => r2.Date - r1.Date);
    });

    // Get the current queryParamMap
    this.queryParamMapSubscription = this.route.queryParamMap.subscribe(params => {
      this.activeRace = this.router.url.includes('resultlist:old') ? params.get('raceid') : 'live';
    });

    this.activeRace = this.router.url.includes('resultlist:old') ? this.route.snapshot.queryParamMap.get('raceid') : 'live';
  }

  /**
   *navigate back and unsubscribe from viewer
   *
   * @memberof ViewerComponent
   */
  onBack() {
    this.viewer.disconnect();
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
    if (this.queryParamMapSubscription && !this.queryParamMapSubscription.closed) {
      this.queryParamMapSubscription.unsubscribe();
    }

    this.liveTimer.stop();
  }

  /**
   *navigate to new startrace and set activeRace
   *
   * @param {*} id
   * @memberof ViewerComponent
   */
  selectedRace(id) {
    this.router.navigateByUrl('viewer/(resultlist:old)?raceid=' + id);
    this.activeRace = id;
  }

  /**
   *set activeRace
   *
   * @param {*} id
   * @memberof ViewerComponent
   */
  changeCurrentRace(id) {
    this.activeRace = id;
  }

  /**
   *get the current selected races title
   *
   * @returns
   * @memberof ViewerComponent
   */
  getCurrentRaceTitle() {
    const temp = this.races.find(r => r.Id === +this.activeRace);
    if (temp) {
      return temp.Title;
    }
  }

  /**
   *call pdf generation
   *
   * @memberof ViewerComponent
   */
  onPdfClick() {
    this.viewer.onPdfClick();
  }

  /**
   *check which startrace is selected
   *
   * @param {*} option
   * @returns
   * @memberof ViewerComponent
   */
  optionIsSelected(option) {
    return option === this.activeRace;
  }
}
