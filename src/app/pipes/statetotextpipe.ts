import { Pipe, PipeTransform } from '@angular/core';
import { RaceManagerState } from '../entities/racemanagerstate';

@Pipe({
    name: 'stateToText'
})
export class StateToTextPipe implements PipeTransform {
    /**
     *returns message based on RaceManagerState
     *
     * @param {RaceManagerState} value
     * @returns {string}
     * @memberof StateToTextPipe
     */
    transform(value: RaceManagerState): string {
        switch (value) {
            case RaceManagerState.Ready:
              return 'Eine Station ist bereit.';
            case RaceManagerState.Disabled:
              return 'Warte auf Station.';
            case RaceManagerState.Measuring:
              return 'Eine Messung ist derzeitig im Gange.';
            case RaceManagerState.MeasurementRequested:
              return 'Gestartet! Warte auf Server';
          }
    }
}
