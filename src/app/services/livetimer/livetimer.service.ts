import { Injectable } from '@angular/core';

@Injectable()
export class LiveTimerService {

    /**
     *time differnence between server and station
     *
     * @private
     * @type {number}
     * @memberof LiveTimerService
     */
    private recDiff: number;
    /**
     *the initial time sent by the station
     *
     * @private
     * @type {number}
     * @memberof LiveTimerService
     */
    private startStationTime: number;
    /**
     *timer keeps track of current race time
     *
     * @private
     * @type {*}
     * @memberof LiveTimerService
     */
    private timer: any;

    public currentTime = 0;

    constructor() { }

    /**
     *start timer and set time diffenrence to station
     *
     * @param {number} recStationTime
     * @param {number} startStationTime
     * @memberof LiveTimerService
     */
    public start(recStationTime: number, startStationTime: number) {
        this.recDiff = Date.now() - recStationTime;
        this.startStationTime = startStationTime;

        this.timer = setInterval(() => {
            this.currentTime = Date.now() - this.recDiff - this.startStationTime;
        }, 0);
    }

    /**
     *reset timer and set currentTime to 0
     *
     * @memberof LiveTimerService
     */
    public stop() {
        clearInterval(this.timer);
        this.currentTime = 0;
    }
}
