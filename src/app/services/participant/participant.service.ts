import { Injectable } from '@angular/core';
import { WebsocketService } from '../websocket/websocket.service';
import { ParticipantCommands, Message, ViewerCommands } from '../../entities/networking';
import { Participant } from '../../entities/participant';
import { Race } from '../../entities/race';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ParticipantService {

  /**
   *list of all startrace open for registration
   *
   * @type {Array<Race>}
   * @memberof ParticipantService
   */
  public races: Array<Race> = [];

  constructor(private ws: WebsocketService) {
    this.ws.received.subscribe(msg => {
      const received = msg as Message<ParticipantCommands>;
      if (received.Command === ParticipantCommands.Races) {
        this.races = received.Data as Array<Race>;
      }
    });
  }

  /**
   *Send a participant entity to store into db
   *
   * @param {Participant} data
   * @memberof ParticipantService
   */
  register(data: Participant) {
    const msg = new Message<ParticipantCommands>();
    msg.Command = ParticipantCommands.Register;
    msg.Data = data;
    this.ws.send(msg);
  }

  /**
   *connect to the ws as a potential participant
   *
   * @memberof ParticipantService
   */
  connect() {
    this.ws.connect('participant');
  }

  /**
   *disconnect from ws
   *
   * @memberof ParticipantService
   */
  disconnect() {
    this.ws.disconnect();
  }
}
