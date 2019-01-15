import { Injectable } from '@angular/core';
import { WebsocketService } from '../websocket/websocket.service';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { AdminCommands, Message } from '../../entities/networking';
import { RaceManagerState } from '../../entities/racemanagerstate';
import { RunStart } from '../../entities/runstart';
import { Assignment } from '../../entities/assignment';
import { Race } from '../../entities/race';

@Injectable()
export class AdminService {

  public state: RaceManagerState;

  public start: Observable<RunStart>;
  private startSubject: Subject<RunStart>;

  public measuredStop: Observable<number>;
  private measuredStopSubject: Subject<number>;

  public end: Observable<null>;
  private endSubject: Subject<null>;

  public availableRace: Observable<Array<Race>>;
  private availableRaceSubject: Subject<Array<Race>>;

  constructor(private ws: WebsocketService) {
    this.startSubject = new Subject<RunStart>();
    this.start = this.startSubject.asObservable();

    this.measuredStopSubject = new Subject<number>();
    this.measuredStop = this.measuredStopSubject.asObservable();

    this.endSubject = new Subject<null>();
    this.end = this.endSubject.asObservable();

    this.availableRaceSubject = new Subject<Array<Race>>();
    this.availableRace = this.availableRaceSubject.asObservable();

    this.ws.received.subscribe(msg => {
      const received = msg as Message<AdminCommands>; // Cast to Admin Message
      switch (received.Command) {
        case AdminCommands.State:
          this.state = received.Data as RaceManagerState; // Pass status to observers
          break;
        case AdminCommands.RaceStart:
          this.startSubject.next(received.Data as RunStart); // Pass status to observers
          break;
        case AdminCommands.RaceEnd:
          this.endSubject.next(); // Pass status to observers
          break;
        case AdminCommands.MeasuredStop:
          this.measuredStopSubject.next(received.Data as number); // Pass status to observers
          break;
        case AdminCommands.AvailableRaces:
          this.availableRaceSubject.next(received.Data as Array<Race>); // Pass status to observers
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
  createRace(race: Race) {
    const msg = new Message<AdminCommands>();
    msg.Command = AdminCommands.CreateRace;
    msg.Data = race;
    this.ws.send(msg);
  }
  connect() {
    this.ws.connect('admin'); // Connect as admin
  }

  disconnect() {
    this.ws.disconnect();
  }
}
