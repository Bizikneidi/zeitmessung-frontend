import { Injectable } from '@angular/core';

@Injectable()
export class LiveTimerService {

    private recDiff: number;
    private startStationTime: number;
    private timer: any;

    public currentTime = 0;

    constructor() { }

    public start(recStationTime: number, startStationTime: number) {
        this.recDiff = Date.now() - recStationTime;
        this.startStationTime = startStationTime;

        this.timer = setInterval(() => {
            this.currentTime = Date.now() - this.recDiff - this.startStationTime;
        }, 0);
    }

    public stop() {
        clearInterval(this.timer);

        this.currentTime = 0;
    }
}
