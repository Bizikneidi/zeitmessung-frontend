import { Injectable } from '@angular/core';
import { WebsocketService } from '../websocket/websocket.service';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { AdminCommands, Message } from '../../entities/networking';
import { TimeMeterState } from '../../entities/timemeterstate';

@Injectable()
export class AdminService {

  public state: Observable<TimeMeterState>;
  private stateSubject: Subject<TimeMeterState>;

  constructor(private ws: WebsocketService) {
    // Allow Observation of state
    this.stateSubject = new Subject<TimeMeterState>();
    this.state = this.stateSubject.asObservable();

    this.ws.received.subscribe(msg => {
      const received = msg as Message<AdminCommands>; // Cast to Admin Message
      if (received.Command === AdminCommands.Status) {
        this.stateSubject.next(received.Data as TimeMeterState); // Pass status to observers
      }
    });
    this.ws.connect('admin'); // Connect as admin
  }

  // send the start command to the server
  startRun() {
    const msg = new Message<AdminCommands>();
    msg.Command = AdminCommands.Start;
    msg.Data = null; // No data
    this.ws.send(msg);
  }

  disconnect() {
    this.ws.disconnect();
  }
}
