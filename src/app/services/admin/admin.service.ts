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

  /**
   *the current stat of a startrace
   *
   * @type {RaceManagerState}
   * @memberof AdminService
   */
  public state: RaceManagerState;

  /**
   *Observe for the start of a startrace
   *
   * @type {Observable<RunStart>}
   * @memberof AdminService
   */
  public start: Observable<RunStart>;
  private startSubject: Subject<RunStart>;

  /**
   *Observe for a new measurement
   *
   * @type {Observable<number>}
   * @memberof AdminService
   */
  public measuredStop: Observable<number>;
  private measuredStopSubject: Subject<number>;

  /**
   *Observe the end of a startrace
   *
   * @type {Observable<null>}
   * @memberof AdminService
   */
  public end: Observable<null>;
  private endSubject: Subject<null>;

  /**
   *list of all races available for start
   *
   * @type {Array<Race>}
   * @memberof AdminService
   */
  public availableRaces: Array<Race>;

  /**
   *Creates an instance of AdminService.
   * @param {WebsocketService} ws
   * @memberof AdminService
   */
  constructor(private ws: WebsocketService) {
    this.startSubject = new Subject<RunStart>();
    this.start = this.startSubject.asObservable();

    this.measuredStopSubject = new Subject<number>();
    this.measuredStop = this.measuredStopSubject.asObservable();

    this.endSubject = new Subject<null>();
    this.end = this.endSubject.asObservable();

    this.availableRaces = new Array<Race>();

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
          this.availableRaces = received.Data;
          break;
      }
    });
  }

  /**
   *send the start command to the server
   *
   * @param {number} id
   * @memberof AdminService
   */
  startRun(id: number) {
    const msg = new Message<AdminCommands>();
    msg.Command = AdminCommands.Start;
    msg.Data = id;
    this.ws.send(msg);
  }

  /**
   *send the assign time command to the server
   *
   * @param {Assignment} assignment
   * @memberof AdminService
   */
  assignTime(assignment: Assignment) {
    const msg = new Message<AdminCommands>();
    msg.Command = AdminCommands.AssignTime;
    msg.Data = assignment;
    this.ws.send(msg);
  }
  /**
   *send the create startrace command to the server
   *
   * @param {Race} race
   * @memberof AdminService
   */
  createRace(race: Race) {
    const msg = new Message<AdminCommands>();
    msg.Command = AdminCommands.CreateRace;
    msg.Data = race;
    this.ws.send(msg);
  }
  /**
   *connect to ws as admin
   *
   * @memberof AdminService
   */
  connect() {
    this.ws.connect('admin'); // Connect as admin
  }

  /**
   *disconnect from ws
   *
   * @memberof AdminService
   */
  disconnect() {
    this.ws.disconnect();
  }

}
