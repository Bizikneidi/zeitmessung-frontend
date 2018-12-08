import { Injectable } from '@angular/core';
import { ViewerService } from '../viewer/viewer.service';
import { Runner } from '../../entities/runnner';
import { Participant } from '../../entities/participant';
import { Race } from '../../entities/race';

@Injectable()
export class LiveresultService {

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

  constructor(private viewer: ViewerService) {
    // Check for the start of a race
    this.viewer.start.subscribe(ms => {
      this.participantList = ms.Runners;
    });

    // Check for the end of a race
    this.viewer.measuredStop.subscribe((runner: Runner) => {
      // Set end of time for runner
      this.participantList.find(item => item.Starter === runner.Starter).Time = runner.Time;

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
