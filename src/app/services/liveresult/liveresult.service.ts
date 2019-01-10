import { Injectable } from '@angular/core';
import { ViewerService } from '../viewer/viewer.service';
import { Participant } from '../../entities/participant';

@Injectable()
export class LiveresultService {

  participantList: Array<Participant> = [];

  constructor(private viewer: ViewerService) {
    // Check for the start of a race
    this.viewer.start.subscribe(ms => {
      this.participantList = ms.Participants;
    });

    // Checks for when a participant finishes
    this.viewer.measuredStop.subscribe((participant: Participant) => {
      // Set end of time for participant
      this.participantList.find(item => item.Starter === participant.Starter).Time = participant.Time;

      // Sort list by time
      this.participantList = this.participantList.sort((a, b) => {
        return (b.Time) - (a.Time);
      });
      this.moveZerosToEnd(this.participantList);
    });

    this.viewer.end.subscribe(() => {
      this.participantList = [];
    });

    // for the test list
    this.participantList = this.participantList.sort((a, b) => {
      return (a.Time) - (b.Time);
    });
    this.moveZerosToEnd(this.participantList);
  }

  moveZerosToEnd(participants: Array<Participant>) {
    let i, temp;

    for (i = participants.length - 1; i >= 0; i--) {
        if (participants[i].Time === 0) {
            temp = participants.splice(i, 1);
            participants.push(temp[0]);
        }
      }
  }

  // is the participant in the current list or has an invalid time
  isValidParticipant(participant: Participant) {
    return this.participantList.some(competitor => competitor === participant) || participant.Time > 0;
  }

  // filters the participantlist
  filterBySex(sex: string) {
    if (sex == null) {
      return this.participantList;
    }
    return this.participantList.filter(competitor => competitor.Sex === sex);
  }

  // gets the rank of the participant, if wanted filtered by sex
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
