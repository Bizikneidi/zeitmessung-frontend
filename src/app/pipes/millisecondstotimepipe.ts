import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'milliSecondsToTime'
})
export class MilliSecondsToTimePipe implements PipeTransform {
    /**
     *returns time in hh:mm:ss or dsds based on deciMil
     *
     * @param {number} value
     * @param {boolean} [deciMil=false]
     * @returns {string}
     * @memberof MilliSecondsToTimePipe
     */
    transform(value: number, deciMil: boolean = false): string {
        const deciSeconds = Math.floor((value / 100) % 10),
            seconds = Math.floor((value / 1000) % 60),
            minutes = Math.floor((value / (1000 * 60)) % 60),
            hours = Math.floor(value / (1000 * 60 * 60));
        if (deciMil) {
            return this.padTime(deciSeconds);
        }
        return this.padTime(hours) + ':' + this.padTime(minutes) + ':' + this.padTime(seconds);
    }

    /**
     *add 0 to format correctly
     *
     * @param {*} t
     * @returns
     * @memberof MilliSecondsToTimePipe
     */
    padTime(t) {
        return t < 10 ? '0' + t : t;
    }
}
