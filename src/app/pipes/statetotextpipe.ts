import { Pipe, PipeTransform } from '@angular/core';
import { TimeMeterState } from '../entities/timemeterstate';

@Pipe({
    name: 'stateToText'
})
export class StateToTextPipe implements PipeTransform {
    transform(value: TimeMeterState): string {
        switch (value) {
            case TimeMeterState.Ready:
              return 'Eine Station ist bereit.';
            case TimeMeterState.Disabled:
              return 'Warte auf Station.';
            case TimeMeterState.Measuring:
              return 'Eine Messung ist derzeitig im Gange.';
            case TimeMeterState.MeasurementRequested:
              return 'Gestartet! Warte auf Server';
          }
    }
}
