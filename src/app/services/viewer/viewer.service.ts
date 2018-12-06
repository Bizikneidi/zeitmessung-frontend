import {Injectable} from '@angular/core';
import {WebsocketService} from '../websocket/websocket.service';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {Message, ViewerCommands} from '../../entities/networking';
import {TimeMeterState} from '../../entities/timemeterstate';
import {MeasurementStart} from '../../entities/measurementstart';
import {Runner} from '../../entities/runnner';
import {Race} from '../../entities/race';

@Injectable()
export class ViewerService {

  // Observe start of run
  public start: Observable<MeasurementStart>;
  private startSubject: Subject<MeasurementStart>;

  // Observe stop of run
  public stop: Observable<Runner>;
  private stopSubject: Subject<Runner>;

  // Observe state of run
  public state: Observable<TimeMeterState>;
  private stateSubject: Subject<TimeMeterState>;

  // Observe all races
  public races: Observable<Array<Race>>;
  private racesSubject: Subject<Array<Race>>;

  constructor(private ws: WebsocketService) {
    this.stateSubject = new Subject<TimeMeterState>();
    this.state = this.stateSubject.asObservable();

    this.startSubject = new Subject<MeasurementStart>();
    this.start = this.startSubject.asObservable();

    this.stopSubject = new Subject<Runner>();
    this.stop = this.stopSubject.asObservable();

    this.racesSubject = new Subject<Array<Race>>();
    this.races = this.racesSubject.asObservable();

    this.ws.received.subscribe(msg => {
      // Cast to Viewer command and pass to correct observable
      const received = msg as Message<ViewerCommands>;
      if (received.Command === ViewerCommands.Status) {
        this.stateSubject.next(received.Data as TimeMeterState);
      } else if (received.Command === ViewerCommands.RunStart) {
        this.startSubject.next(received.Data as MeasurementStart);
      } else if (received.Command === ViewerCommands.RunnerFinished) {
        this.stopSubject.next(received.Data as Runner);
      } else if (received.Command === ViewerCommands.Races) {
        this.racesSubject.next(received.Data as Array<Race>);
      }
    });
  }

  connect() {
    this.ws.connect('viewer'); // Connect as viewer
  }

  disconnect() {
    this.ws.disconnect();
  }

  getRunners(raceid: number) {
    const msg = new Message<ViewerCommands>();
    msg.Command = ViewerCommands.GetRunners;
    msg.Data = raceid;
    this.ws.send(msg);
  }
}
