import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Message } from '../../entities/networking';
import { forEach } from '@angular/router/src/utils/collection';

@Injectable()
export class WebsocketService {

  private ws: WebSocket; // The actual websocket
  private receivedSubject: Subject<Message<any>>; // Use RXJS to pass on data
  public received: Observable<Message<any>>; // Allow reading of data to other classes

  private messages: Array<Message<any>>;
  private path = '';

  constructor() {
    this.receivedSubject = new Subject();
    this.received = this.receivedSubject.asObservable();
  }

  public connect(path: string) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) { // If websocket has been initialized, disconnect
      if (this.path === path) { // Do not reconnect
        return;
      }
      this.disconnect();
    }
    this.path = path;
    this.messages = [];
    this.ws = new WebSocket('wss://172.18.2.16:5001/' + path); // Connect to path
    // this.ws = new WebSocket('ws://localhost:5000/' + path); // Connect to path
    // Pass results to subject
    this.ws.onmessage = ev => this.receivedSubject.next(JSON.parse(ev.data));
    this.ws.onerror = ev => this.receivedSubject.error(ev);
    this.ws.onopen = () => {
      this.messages.forEach(m => {
        this.send(m);
      });
      this.messages = [];
    };
  }

  public disconnect() {
    if (this.ws.readyState === WebSocket.OPEN) {
      this.ws.close(); // Close the connection
    }
  }

  // Send a message of any command to another socket (as JSON string)
  public send(message: Message<any>) {
    if (!this.ws.readyState || this.ws.readyState !== this.ws.OPEN) {
      this.messages.push(message);
    } else {
      this.ws.send(JSON.stringify(message));
    }
  }
}
