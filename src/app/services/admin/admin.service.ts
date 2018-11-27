import {Injectable} from '@angular/core';
import {WebsocketService} from '../websocket/websocket.service';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {AdminCommands, Message} from '../../entities/networking';
import {TimeMeterState} from '../../entities/timemeterstate';
import { Assignment } from '../../entities/assignment';
import { RunStartDTO } from '../../entities/runstart';

@Injectable()
export class AdminService {

  public state: Observable<TimeMeterState>;
  private stateSubject: Subject<TimeMeterState>;

  public runStart: Observable<RunStartDTO>;
  private runStartSubject: Subject<RunStartDTO>;

  public measuredStop: Observable<number>;
  private measuredStopSubject: Subject<number>;

  //

  constructor(private ws: WebsocketService) {
    // Allow Observation of state
    this.stateSubject = new Subject<TimeMeterState>();
    this.state = this.stateSubject.asObservable();

    this.runStartSubject = new Subject<RunStartDTO>();
    this.runStart = this.runStartSubject.asObservable();

    this.measuredStopSubject = new Subject<number>();
    this.measuredStop = this.measuredStopSubject.asObservable();

    this.ws.received.subscribe(msg => {
      const received = msg as Message<AdminCommands>; // Cast to Admin Message
      switch (received.Command) {
        case AdminCommands.Status:
          this.stateSubject.next(received.Data as TimeMeterState); // Pass status to observers
          break;
        case AdminCommands.RunStart:
          this.runStartSubject.next(received.Data as RunStartDTO); // Pass status to observers
          break;
        case AdminCommands.MeasuredStop:
          this.measuredStopSubject.next(received.Data as number); // Pass status to observers
          break;
      }
    });
  }

  // send the start command to the server
  startRun() {
    const msg = new Message<AdminCommands>();
    msg.Command = AdminCommands.Start;
    msg.Data = null; // No data
    this.ws.send(msg);
  }

  assignTime(runner: Assignment) {
    const msg = new Message<AdminCommands>();
    msg.Command = AdminCommands.AssignTime;
    msg.Data = runner;
    this.ws.send(msg);
  }

  connect() {
    this.ws.connect('admin'); // Connect as admin
  }

  disconnect() {
    this.ws.disconnect();
  }
}
