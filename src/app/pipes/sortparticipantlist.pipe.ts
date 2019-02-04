import { Pipe, PipeTransform } from '@angular/core';
import { Participant } from '../entities/participant';

@Pipe({
  name: 'sortparticipantlist'
})
export class SortParticipantListPipe implements PipeTransform {

  /**
   *sort participantlist by time
   *
   * @param {Array<Participant>} value
   * @param {*} [args]
   * @returns {*}
   * @memberof SortParticipantListPipe
   */
  transform(value: Array<Participant>, args?: any): Array<Participant> {
    value = value.sort((a, b) => {
      return (b.Time) - (a.Time);
    });
    return this.moveZerosToEnd(value);
  }

  /**
   *move participants with time of 0 to the end
   *
   * @param {Array<Participant>} participants
   * @returns {Array<Participant>}
   * @memberof SortParticipantListPipe
   */
  moveZerosToEnd(participants: Array<Participant>): Array<Participant> {
    let i, temp;
    for (i = participants.length - 1; i >= 0; i--) {
      if (participants[i].Time === 0) {
        temp = participants.splice(i, 1);
        participants.push(temp[0]);
      }
    }
    return participants;
  }

}
