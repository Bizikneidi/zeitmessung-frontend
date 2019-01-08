import { Injectable } from '@angular/core';
import { WebsocketService } from '../websocket/websocket.service';
import { ParticipantCommands, Message, ViewerCommands } from '../../entities/networking';
import { Participant } from '../../entities/participant';
import { Race } from '../../entities/race';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ParticipantService {

  // Observe available races
  public races: Observable<Array<Race>>
  private racesSubject: Subject<Array<Race>>

  constructor(private ws: WebsocketService) {
    this.racesSubject = new Subject<Array<Race>>();
    this.races = this.racesSubject.asObservable();

    this.ws.received.subscribe(msg => {
      const received = msg as Message<ParticipantCommands>;
      if(received.Command == ParticipantCommands.Races){
        this.racesSubject.next(received.Data as Array<Race>);
        console.log("printing races")
        console.log(received.Data);
      }
    });
  }

  // Send a participant entity to store into db
  register(data: Participant) {
    const msg = new Message<ParticipantCommands>();
    msg.Command = ParticipantCommands.Register;
    msg.Data = data;
    this.ws.send(msg);
  }

  connect() {
    this.ws.connect('participant'); // Connect as potential participant
  }

  disconnect() {
    this.ws.disconnect();
  }
}
