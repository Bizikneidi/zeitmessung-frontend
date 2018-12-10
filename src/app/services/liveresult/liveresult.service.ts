import { Injectable } from '@angular/core';
import { ViewerService } from '../viewer/viewer.service';
import { Runner } from '../../entities/runner';
import { Participant } from '../../entities/participant';
import { Race } from '../../entities/race';

@Injectable()
export class LiveresultService {

  participantList: Array<Runner> = [];

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

    this.viewer.end.subscribe(() => {
      this.participantList = [];
    })

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
