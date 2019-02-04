import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Message } from '../../entities/networking';
import { forEach } from '@angular/router/src/utils/collection';

@Injectable()
export class WebsocketService {

  /**
   *The actual websocket
   *
   * @private
   * @type {WebSocket}
   * @memberof WebsocketService
   */
  private ws: WebSocket;
  /**
   *Use RXJS to pass on data
   *
   * @private
   * @type {Subject<Message<any>>}
   * @memberof WebsocketService
   */
  private receivedSubject: Subject<Message<any>>;
  /**
   *Allow reading of data to other classes
   *
   * @type {Observable<Message<any>>}
   * @memberof WebsocketService
   */
  public received: Observable<Message<any>>;

  /**
   *ws message
   *
   * @private
   * @type {Array<Message<any>>}
   * @memberof WebsocketService
   */
  private messages: Array<Message<any>>;
  /**
   *path for ws connection
   *
   * @private
   * @memberof WebsocketService
   */
  private path = '';

  /**
   *Creates an instance of WebsocketService.
   * @memberof WebsocketService
   */
  constructor() {
    this.receivedSubject = new Subject();
    this.received = this.receivedSubject.asObservable();
  }

  /**
   *connect to specified path
   *
   * @param {string} path
   * @returns
   * @memberof WebsocketService
   */
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

  /**
   *disconnect from ws
   *
   * @memberof WebsocketService
   */
  public disconnect() {
    if (this.ws.readyState === WebSocket.OPEN) {
      this.ws.close(); // Close the connection
    }
  }

  /**
   *Send a message of any command to another socket (as JSON string)
   *
   * @param {Message<any>} message
   * @memberof WebsocketService
   */
  public send(message: Message<any>) {
    if (!this.ws.readyState || this.ws.readyState !== this.ws.OPEN) {
      this.messages.push(message);
    } else {
      this.ws.send(JSON.stringify(message));
    }
  }
}
