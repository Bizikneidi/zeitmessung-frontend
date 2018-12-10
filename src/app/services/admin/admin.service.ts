import { Injectable } from '@angular/core';
import { WebsocketService } from '../websocket/websocket.service';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { AdminCommands, Message } from '../../entities/networking';
import { TimeMeterState } from '../../entities/timemeterstate';
import { RunStartDTO } from '../../entities/runstart';
import { Assignment } from '../../entities/assignment';

@Injectable()
export class AdminService {

  public state: TimeMeterState;

  public start: Observable<RunStartDTO>;
  private startSubject: Subject<RunStartDTO>;

  public measuredStop: Observable<number>;
  private measuredStopSubject: Subject<number>;

  public end: Observable<null>;
  private endSubject: Subject<null>;

  constructor(private ws: WebsocketService) {
    this.startSubject = new Subject<RunStartDTO>();
    this.start = this.startSubject.asObservable();

    this.measuredStopSubject = new Subject<number>();
    this.measuredStop = this.measuredStopSubject.asObservable();

    this.endSubject = new Subject<null>();
    this.end = this.endSubject.asObservable();

    this.ws.received.subscribe(msg => {
      const received = msg as Message<AdminCommands>; // Cast to Admin Message
      switch (received.Command) {
        case AdminCommands.Status:
          this.state = received.Data as TimeMeterState; // Pass status to observers
          break;
        case AdminCommands.RunStart:
          this.startSubject.next(received.Data as RunStartDTO); // Pass status to observers
          break;
        case AdminCommands.RunEnd:
          this.endSubject.next(); // Pass status to observers
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

  assignTime(assignment: Assignment) {
    const msg = new Message<AdminCommands>();
    msg.Command = AdminCommands.AssignTime;
    msg.Data = assignment;
    this.ws.send(msg);
  }

  connect() {
    this.ws.connect('admin'); // Connect as admin
  }

  disconnect() {
    this.ws.disconnect();
  }
}
