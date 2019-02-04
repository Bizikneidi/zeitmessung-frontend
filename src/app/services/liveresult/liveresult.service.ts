import { Injectable } from '@angular/core';
import { ViewerService } from '../viewer/viewer.service';
import { Participant } from '../../entities/participant';
import { SortParticipantListPipe } from '../../pipes/sortparticipantlist.pipe';

@Injectable()
export class LiveresultService {

  /**
   *list of participants for the live startrace
   *
   * @type {Array<Participant>}
   * @memberof LiveresultService
   */
  participantList: Array<Participant> = [];

  /**
   *Creates an instance of LiveresultService.
   * @param {ViewerService} viewer
   * @param {SortParticipantListPipe} sortParticipantListPipe
   * @memberof LiveresultService
   */
  constructor(private viewer: ViewerService, private sortParticipantListPipe: SortParticipantListPipe) {
    // Check for the start of a race
    this.viewer.start.subscribe(ms => {
      this.participantList = ms.Participants;
    });

    // Checks for when a participant finishes
    this.viewer.measuredStop.subscribe((participant: Participant) => {
      // Set end of time for participant
      this.participantList.find(item => item.Starter === participant.Starter).Time = participant.Time;

      this.participantList = this.sortParticipantListPipe.transform(this.participantList);
    });

    this.viewer.end.subscribe(() => {
      this.participantList = [];
    });
  }

  /**
   *sorts participantlist
   *
   * @memberof LiveresultService
   */
  sortList() {
    this.sortParticipantListPipe.transform(this.participantList);
  }

  /**
   *is the participant in the current list or has an invalid time
   *
   * @param {Participant} participant
   * @returns
   * @memberof LiveresultService
   */
  isValidParticipant(participant: Participant) {
    return this.participantList.some(competitor => competitor === participant) || participant.Time > 0;
  }

  /**
   *filters the participantlist by sex
   *
   * @param {string} sex
   * @returns
   * @memberof LiveresultService
   */
  filterBySex(sex: string) {
    if (sex == null) {
      return this.participantList;
    }
    return this.participantList.filter(competitor => competitor.Sex === sex);
  }

  /**
   *gets the rank of the participant, if wanted filtered by sex
   *
   * @param {Participant} participant
   * @param {Boolean} [filterBySex=false]
   * @returns
   * @memberof LiveresultService
   */
  getRank(participant: Participant, filterBySex: Boolean = false) {
    // is the participant valid
    if (!this.isValidParticipant(participant)) {
      return 0;
    }

    let rank = 1;

    // do you want to filter via sex
    for (const competitor of this.filterBySex(filterBySex ? participant.Sex : null)) {
      // is there some one faster than the participant
      if (competitor.Time > 0 && competitor.Time < participant.Time) {
        rank++;
      }
    }
    return rank;
  }
}
