/**
 *Used to transfer a starter number and a time to assign a participant his time
 *
 * @export
 * @class Assignment
 */
export class Assignment {
    /**
     *The starter number of the participant
     *
     * @type {number}
     * @memberof Assignment
     */
    public Starter: number;
    /**
     *The time of the participant
     *
     * @type {number}
     * @memberof Assignment
     */
    public Time: number;

    /**
     *Creates an instance of Assignment.
     * @param {number} starter
     * @param {number} time
     * @memberof Assignment
     */
    constructor(starter: number, time: number) {
        this.Starter = starter;
        this.Time = time;
    }
}
