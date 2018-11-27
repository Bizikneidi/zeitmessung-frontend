import { Component, OnInit } from '@angular/core';
import { Runner } from '../../entities/runnner';
import { Participant } from '../../entities/participant';
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


  /*participantList: Array<Runner> = [{Starter: 12, Participant: new Participant('Peter', 'Hauer'), Time: new Time, Race: new Race()},
                                    {Starter: 9, Participant: new Participant('Richard', 'Hoang'), Time: new Time, Race: new Race()}];*/

    participantList: Array<Runner> = [
                                    {Starter: 12, Participant: new Participant('Peter', 'Hauer'), Time: 0, Race: new Race()},
                                    {Starter: 12, Participant: new Participant('Peter', 'Hauer'), Time: 0, Race: new Race()},
                                    {Starter: 12, Participant: new Participant('Peter', 'Hauer'), Time: 0, Race: new Race()},
                                    {Starter: 12, Participant: new Participant('Peter', 'Hauer'), Time: 0, Race: new Race()},
                                    {Starter: 12, Participant: new Participant('Peter', 'Hauer'), Time: 0, Race: new Race()},
                                    {Starter: 12, Participant: new Participant('Peter', 'Hauer'), Time: 0, Race: new Race()},
                                    {Starter: 12, Participant: new Participant('Peter', 'Hauer'), Time: 0, Race: new Race()},
                                    {Starter: 12, Participant: new Participant('Peter', 'Hauer'), Time: 0, Race: new Race()},
                                    {Starter: 12, Participant: new Participant('Peter', 'Hauer'), Time: 0, Race: new Race()},
                                    {Starter: 12, Participant: new Participant('Peter', 'Hauer'), Time: 0, Race: new Race()},
                                    {Starter: 12, Participant: new Participant('Peter', 'Hauer'), Time: 0, Race: new Race()},
                                    {Starter: 12, Participant: new Participant('Peter', 'Hauer'), Time: 0, Race: new Race()},
                                    {Starter: 12, Participant: new Participant('Peter', 'Hauer'), Time: 0, Race: new Race()},
                                    {Starter: 12, Participant: new Participant('Peter', 'Hauer'), Time: 33333333, Race: new Race()},
                                    {Starter: 9, Participant: new Participant('Richard', 'Hoang'), Time: 3332333, Race: new Race()},
                                    {Starter: 10, Participant: new Participant('Severin', 'Berger'), Time: 3333133, Race: new Race()}
                                    ];

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
      this.participantList.find(item => item.Starter === finishedRunner.Starter).Time = finishedRunner.Time;

      // Sort list by time
      this.participantList = this.participantList.sort((a, b) => {
        return (a.Time) - (b.Time);
      });
      this.moveZerosToEnd(this.participantList);
    });

    // for the test list
    this.participantList = this.participantList.sort((a, b) => {
      return (a.Time) - (b.Time);
    });
    this.moveZerosToEnd(this.participantList);
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.startSubscription.unsubscribe();
    this.stopSubscription.unsubscribe();

    this.viewer.disconnect();
  }

  getRank(runner: Runner) {
    if (!this.participantList.some(function(r) {
      return r === runner;
    }) || runner.Time <= 0) {
      return 0;
    }
    let rank = 1;
    for (const r of this.participantList) {
      if (r.Time > 0 && r.Time < runner.Time) {
        rank++;
      }
    }
    return rank;
  }


  moveZerosToEnd(runners: Array<Runner>) {
    let i, temp;

    for (i = runners.length - 1; i >= 0; i--) {
        if (runners[i].Time === 0) {
            temp = runners.splice(i, 1);
            runners.push(temp[0]);
        }
      }
  }

}
