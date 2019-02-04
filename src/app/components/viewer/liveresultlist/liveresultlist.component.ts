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
  /**
   *Creates an instance of LiveresultlistComponent.
   * @param {LiveresultService} liveresult
   * @memberof LiveresultlistComponent
   */
  constructor(public liveresult: LiveresultService) {}

  ngOnInit() {
    this.liveresult.sortList();
  }
  ngOnDestroy() {}

  /**
   *get rank of specific participant
   *
   * @param {Participant} participant
   * @returns
   * @memberof LiveresultlistComponent
   */
  getRank(participant: Participant) {
    return this.liveresult.getRank(participant);
  }

  /**
   *get rank of specific participant by sex
   *
   * @param {Participant} participant
   * @returns {number}
   * @memberof LiveresultlistComponent
   */
  getRankBySex(participant: Participant): number {
    return this.liveresult.getRank(participant, true);
  }
}
