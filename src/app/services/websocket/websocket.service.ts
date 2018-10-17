import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Message } from '../../entities/networking';

@Injectable()
export class WebsocketService {

  private ws: WebSocket; // The actual websocket
  private receivedSubject: Subject<Message<any>>; // Use RXJS to pass on data
  public received: Observable<Message<any>>; // Allow reading of data to other classes

  constructor() {
    this.receivedSubject = new Subject();
    this.received = this.receivedSubject.asObservable();
  }

  public connect(path: string) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) { // If websocket has been initialized, disconnect
      this.disconnect();
    }
    this.ws = new WebSocket('wss://localhost:44307/' + path); // Connect to path
    // Pass results to subject
    this.ws.onmessage = ev => this.receivedSubject.next(JSON.parse(ev.data));
    this.ws.onerror = ev => this.receivedSubject.error(ev);
    this.ws.onclose = () => this.receivedSubject.complete();
  }

  public disconnect() {
    if (this.ws.readyState === WebSocket.OPEN) {
      this.ws.close(); // Close the connection
    }
  }

  // Send a message of any command to another socket (as JSON string)
  public send(message: Message<any>) {
    this.ws.send(JSON.stringify(message));
  }
}
