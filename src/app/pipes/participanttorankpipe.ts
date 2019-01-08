import { Pipe, PipeTransform } from '@angular/core';
import { Participant } from '../entities/participant';

@Pipe({
    name: 'participantToRank'
})
export class ParticipantToRankPipe implements PipeTransform {
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
    transform(value: Participant, participantList: Array<Participant>): number {
        if (!participantList.some(r => r === value) || value.Time <= 0) {
            return 0;
          }
          let rank = 1;
          for (const r of participantList.filter(ru => ru.Participant.Sex === value.Participant.Sex)) {
            if (r.Time > 0 && r.Time < value.Time) {
              rank++;
            }
          }
          return rank;
    }
}
