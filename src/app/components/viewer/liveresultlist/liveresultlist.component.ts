import { Component, OnDestroy, OnInit } from '@angular/core';
import { LiveresultService } from '../../../services/liveresult/liveresult.service';
import { Participant } from '../../../entities/participant';
import {
  query,
  keyframes,
  trigger,
  transition,
  animate,
  style,
  stagger
} from '@angular/animations';

@Component({
  selector: 'app-liveresultlist',
  templateUrl: './liveresultlist.component.html',
  styleUrls: ['./liveresultlist.component.css'],
  animations: [
    trigger('slideAnimation', [
      transition('* => *', [
        query(':enter', style({ opacity: 0 }), { optional: true }),

        query(
          ':enter',
          stagger('300ms', [
            animate(
              '.6s ease-in',
              keyframes([
                style({ opacity: 0, transform: 'translateY(-75%)', offset: 0 }),
                style({
                  opacity: 0.5,
                  transform: 'translateY(35px)',
                  offset: 0.3
                }),
                style({ opacity: 1, transform: 'translateY(0)', offset: 1.0 })
              ])
            )
          ]),
          { optional: true }
        )
      ])
    ])
  ]
})
export class LiveresultlistComponent implements OnInit, OnDestroy {
  constructor(public liveresult: LiveresultService) {}

  ngOnInit() {}
  ngOnDestroy() {}

  getRank(participant: Participant) {
    return this.liveresult.getRank(participant);
  }

  getRankBySex(participant: Participant): number {
    return this.liveresult.getRank(participant, true);
  }
}
