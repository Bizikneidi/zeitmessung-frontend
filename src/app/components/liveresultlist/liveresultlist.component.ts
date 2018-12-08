import {Component, OnDestroy, OnInit} from '@angular/core';
import { LiveresultService } from '../../services/liveresult/liveresult.service';

@Component({
  selector: 'app-liveresultlist',
  templateUrl: './liveresultlist.component.html',
  styleUrls: ['./liveresultlist.component.css']
})
export class LiveresultlistComponent implements OnInit, OnDestroy {
  constructor(private liveresult: LiveresultService) {
  }

  ngOnInit() { }
  ngOnDestroy() { }

  getRank(runner: Runner) {
    if (!this.liveresult.participantList.some(function(r) {
      return r === runner;
    }) || runner.Time <= 0) {
      return 0;
    }
    let rank = 1;
    for (const r of this.liveresult.participantList) {
      if (r.Time > 0 && r.Time < runner.Time) {
        rank++;
      }
    }
    return rank;
  }

}
