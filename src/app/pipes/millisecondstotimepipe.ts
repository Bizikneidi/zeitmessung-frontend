import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'milliSecondsToTime'
})
export class MilliSecondsToTimePipe implements PipeTransform {
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

    padTime(t) {
        return t < 10 ? '0' + t : t;
    }
}
