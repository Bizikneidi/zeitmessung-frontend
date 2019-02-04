import { Participant } from './participant';

/**
 *Used to transfer basic data about the current race
 *
 * @export
 * @class RunStart
 */
export class RunStart {
    /**
     *The current time of the station
     *
     * @type {number}
     * @memberof RunStart
     */
    public CurrentTime: number; // The current time of the station
    /**
     *All the participants in the current race
     *
     * @type {Array<Participant>}
     * @memberof RunStart
     */
    public Participants: Array<Participant>; // All participants participating in this event
    /**
     *All the participants in the current race
     *
     * @type {number}
     * @memberof RunStart
     */
    public StartTime: number; // The start time of the station
}
