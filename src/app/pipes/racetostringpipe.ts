import { Pipe, PipeTransform } from '@angular/core';
import { Race } from '../entities/race';

@Pipe({
    name: 'raceToString'
})
export class RaceToStringPipe implements PipeTransform {
    transform(value: Race): string {
        return new Date(value.Date).toLocaleDateString();
    }
}
