import { Injectable } from '@angular/core';
import { ViewerService } from '../viewer/viewer.service';
import { Participant } from '../../entities/participant';

@Injectable()
export class LiveresultService {

  /**
   *list of participants for the live race
   *
   * @type {Array<Participant>}
   * @memberof LiveresultService
   */
  participantList: Array<Participant> = [];

  /**
   *Creates an instance of LiveresultService.
   * @param {ViewerService} viewer
   * @memberof LiveresultService
   */
  constructor(private viewer: ViewerService) {
    // Check for the start of a race
    this.viewer.start.subscribe(ms => {
      this.participantList = ms.Participants;
    });

    // Checks for when a participant finishes
    this.viewer.measuredStop.subscribe((participant: Participant) => {
      // Set end of time for participant
      this.participantList.find(item => item.Starter === participant.Starter).Time = participant.Time;

      this.sortList();
    });

    this.viewer.end.subscribe(() => {
      this.participantList = [];
    });
  }


  /**
   *sort participantlist by time
   *
   * @memberof LiveresultService
   */
  sortList() {
    this.participantList = this.participantList.sort((a, b) => {
      return (b.Time) - (a.Time);
    });
    this.moveZerosToEnd(this.participantList);
  }

  /**
   *move participants with time of 0 to the end
   *
   * @param {Array<Participant>} participants
   * @memberof LiveresultService
   */
  moveZerosToEnd(participants: Array<Participant>) {
    let i, temp;

    for (i = participants.length - 1; i >= 0; i--) {
        if (participants[i].Time === 0) {
            temp = participants.splice(i, 1);
            participants.push(temp[0]);
        }
      }
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
