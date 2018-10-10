import { Injectable } from '@angular/core';
import { WebsocketService } from '../websocket/websocket.service';
import { ParticipantCommands, Message } from '../../entities/networking';
import { Participant } from '../../entities/participant';

@Injectable()
export class ParticipantService {

  constructor(private ws: WebsocketService) {
    this.ws.connect('participant'); // Connect as potential participant
  }

  // Send a participant entity to store into db
  register(data: Participant) {
    const msg = new Message<ParticipantCommands>();
    msg.Command = ParticipantCommands.Register;
    msg.Data = data;
    this.ws.send(msg);
  }

  disconnect() {
    this.ws.disconnect();
  }
}
