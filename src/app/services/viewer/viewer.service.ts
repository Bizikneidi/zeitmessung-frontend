import { Injectable } from '@angular/core';
import { WebsocketService } from '../websocket/websocket.service';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { ViewerCommands, Message } from '../../entities/networking';
import { TimeMeterState } from '../../entities/timemeterstate';
import { MeasurementStart } from '../../entities/measurementstart';
import { FinishedRunner } from '../../entities/finishedrunner';

@Injectable()
export class ViewerService {

  // Observe start of run
  public start: Observable<MeasurementStart>;
  private startSubject: Subject<MeasurementStart>;

  // Observe stop of run
  public stop: Observable<FinishedRunner>;
  private stopSubject: Subject<FinishedRunner>;

  // Observe state of run
  public state: Observable<TimeMeterState>;
  private stateSubject: Subject<TimeMeterState>;

  constructor(private ws: WebsocketService) {
    this.stateSubject = new Subject<TimeMeterState>();
    this.state = this.stateSubject.asObservable();

    this.startSubject = new Subject<MeasurementStart>();
    this.start = this.startSubject.asObservable();

    this.stopSubject = new Subject<FinishedRunner>();
    this.stop = this.stopSubject.asObservable();

    this.ws.received.subscribe(msg => {
      // Cast to Viewer command and pass to correct observable
      const received = msg as Message<ViewerCommands>;
      if (received.Command === ViewerCommands.Status) {
        this.stateSubject.next(received.Data as TimeMeterState);
      } else if (received.Command === ViewerCommands.RunStart) {
        this.startSubject.next(received.Data as MeasurementStart);
      } else if (received.Command === ViewerCommands.RunnerFinished) {
        this.stopSubject.next(received.Data as FinishedRunner);
      }
    });
  }

  connect() {
    this.ws.connect('viewer'); // Connect as viewer
  }

  disconnect() {
    this.ws.disconnect();
  }
}
