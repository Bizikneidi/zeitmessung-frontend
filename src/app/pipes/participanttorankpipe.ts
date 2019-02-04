import { Pipe, PipeTransform } from '@angular/core';
import { Participant } from '../entities/participant';

@Pipe({
    name: 'participantToRank'
})
export class ParticipantToRankPipe implements PipeTransform {
    /**
     *returns rank of given participant in given list of participants
     *
     * @param {Participant} value
     * @param {Array<Participant>} participantList
     * @returns {number}
     * @memberof ParticipantToRankPipe
     */
    transform(value: Participant, participantList: Array<Participant>): number {
        if (
            !participantList.some(function(r) {
              return r === value;
            }) ||
            value.Time <= 0
          ) {
            return 0;
          }
          let rank = 1;
          for (const r of participantList) {
            if (r.Time > 0 && r.Time < value.Time) {
              rank++;
            }
          }
          return rank;
    }
}

@Pipe({
    name: 'participantToSexRank'
})
export class ParticipantToSexRankPipe implements PipeTransform {
    /**
     *returns sex class rank of given participant in given list of participants
     *
     * @param {Participant} value
     * @param {Array<Participant>} participantList
     * @returns {number}
     * @memberof ParticipantToSexRankPipe
     */
    transform(value: Participant, participantList: Array<Participant>): number {
        if (!participantList.some(r => r === value) || value.Time <= 0) {
            return 0;
          }
          let rank = 1;
          for (const r of participantList.filter(p => p.Sex === value.Sex)) {
            if (r.Time > 0 && r.Time < value.Time) {
              rank++;
            }
          }
          return rank;
    }
}
