import { Component, OnInit } from '@angular/core';
import { Runner } from '../../entities/runnner';
import { Participant } from '../../entities/participant';
import { Time } from '../../entities/time';
import { Race } from '../../entities/race';
import { ViewerService } from '../../services/viewer/viewer.service';
import { Subscription } from 'rxjs/Subscription';
import { FinishedRunner } from '../../entities/finishedrunner';

@Component({
  selector: 'app-liveresultlist',
  templateUrl: './liveresultlist.component.html',
  styleUrls: ['./liveresultlist.component.css']
})
export class LiveresultlistComponent implements OnInit {


  participantList: Array<Runner> = [{ Starter: 12, Participant: new Participant('Peter', 'Hauer'), Time: new Time, Race: new Race() },
  { Starter: 9, Participant: new Participant('Richard', 'Hoang'), Time: new Time, Race: new Race() }];


  // For cleaning up in onDestroy()
  startSubscription: Subscription;
  stopSubscription: Subscription;

  constructor(private viewer: ViewerService) { }

  ngOnInit() {
    this.viewer.connect(); // Connect on website visit

    // Check for the start of a race
    this.startSubscription = this.viewer.start.subscribe(ms => {
      this.participantList = ms.Runners;
    });

    // Check for the end of a race
    this.stopSubscription = this.viewer.stop.subscribe((finishedRunner: FinishedRunner) => {
      // Set end of time for runner
      this.participantList.find(item => item.Starter == finishedRunner.Starter).Time.End = finishedRunner.Time

      // Sort list by time
      this.participantList = this.participantList.sort((a, b) => {
        if (a.Time.End - a.Time.Start <= 0) {
          return 1;
        }
        return (a.Time.End - a.Time.Start) - (b.Time.End - b.Time.Start);
      });
    });
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.startSubscription.unsubscribe();
    this.stopSubscription.unsubscribe();

    this.viewer.disconnect();
  }

}
