import { Participant } from './participant';

/**
 *Used to transfer basic data about the current startrace
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
     *All the participants in the current startrace
     *
     * @type {Array<Participant>}
     * @memberof RunStart
     */
    public Participants: Array<Participant>; // All participants participating in this event
    /**
     *All the participants in the current startrace
     *
     * @type {number}
     * @memberof RunStart
     */
    public StartTime: number; // The start time of the station
}
