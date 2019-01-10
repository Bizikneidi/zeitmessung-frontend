import { Injectable } from '@angular/core';
import { ViewerService } from '../viewer/viewer.service';
import { Participant } from '../../entities/participant';
import { Race } from '../../entities/race';

@Injectable()
export class LiveresultService {

  participantList: Array<Participant> = [];

  constructor(private viewer: ViewerService) {
    // Check for the start of a race
    this.viewer.start.subscribe(ms => {
      this.participantList = ms.Participants;
    });

    // Check for the end of a race
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

  // filters the participantlist
  filterBySex(sex: string) {
    return this.participantList.filter(ru => ru.Participant.Sex === sex);
  }

  getRankBySex(participant: Participant): number {
    // if the participant ins't contained in the list or has an invalid time
    if (!this.participantList.some(r => r === participant) || participant.Time <= 0) {
      return 0;
    }
    
    let rank = 1;
    
    for (const competitor of this.filterBySex(participant.Participant.Sex)) {
      // is there some one faster than the participant
      if (competitor.Time > 0 && competitor.Time < participant.Time) {
        rank++;
      }
    }
    return rank;
  }
}
