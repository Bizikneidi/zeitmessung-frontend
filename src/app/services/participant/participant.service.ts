import { Injectable } from '@angular/core';
import { WebsocketService } from '../websocket/websocket.service';
import { ParticipantCommands, Message } from '../../entities/networking';
import { Participant } from '../../entities/participant';

@Injectable()
export class ParticipantService {

  constructor(private ws: WebsocketService) {  }

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
