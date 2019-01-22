import { Pipe, PipeTransform } from '@angular/core';
import { Race } from '../entities/race';

@Pipe({
    name: 'raceToString'
})
export class RaceToStringPipe implements PipeTransform {
    transform(value: Race, date: boolean = false): string {
        if (date) {
            return new Date(value.Date).toLocaleDateString();
        }
        return value.Title;
    }
}
