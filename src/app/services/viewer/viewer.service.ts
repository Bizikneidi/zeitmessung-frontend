import {Injectable} from '@angular/core';
import {WebsocketService} from '../websocket/websocket.service';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import {Message, ViewerCommands} from '../../entities/networking';
import {TimeMeterState} from '../../entities/timemeterstate';
import {Runner} from '../../entities/runner';
import {Race} from '../../entities/race';
import { RunStartDTO } from '../../entities/runstart';

@Injectable()
export class ViewerService {

  public state: TimeMeterState;
  private raceArray: Array<Race>;

  // Observe start of run
  public start: Observable<RunStartDTO>;
  private startSubject: Subject<RunStartDTO>;

  // Observe runner finish run
  public measuredStop: Observable<Runner>;
  private measuredStopSubject: Subject<Runner>;

  // Observe end of run
  public end: Observable<null>;
  private endSubject: Subject<null>;

  // Observe all races
  public races: Observable<Array<Race>>;
  private racesSubject: Subject<Array<Race>>;

  // Observe all runners per race
  public runners: Observable<Array<Runner>>;
  private runnersSubject: Subject<Array<Runner>>;

  // Observe the pdf button click
  public pdfClick: Observable<null>;
  private pdfClickSubject: Subject<null>;

  constructor(private ws: WebsocketService) {
    this.startSubject = new Subject<RunStartDTO>();
    this.start = this.startSubject.asObservable();

    this.measuredStopSubject = new Subject<Runner>();
    this.measuredStop = this.measuredStopSubject.asObservable();

    this.endSubject = new Subject<null>();
    this.end = this.endSubject.asObservable();

    this.racesSubject = new Subject<Array<Race>>();
    this.races = this.racesSubject.asObservable();
    this.races.subscribe(r => this.raceArray = r);

    this.runnersSubject = new Subject<Array<Runner>>();
    this.runners = this.runnersSubject.asObservable();

    this.pdfClickSubject = new Subject<null>();
    this.pdfClick = this.pdfClickSubject.asObservable();

    this.ws.received.subscribe(msg => {
      // Cast to Viewer command and pass to correct observable
      const received = msg as Message<ViewerCommands>;
      if (received.Command === ViewerCommands.Status) {
        this.state = received.Data as TimeMeterState;
      } else if (received.Command === ViewerCommands.RunStart) {
        this.startSubject.next(received.Data as RunStartDTO);
      } else if (received.Command === ViewerCommands.RunEnd) {
        this.endSubject.next();
      } else if (received.Command === ViewerCommands.RunnerFinished) {
        this.measuredStopSubject.next(received.Data as Runner);
      } else if (received.Command === ViewerCommands.Races) {
        this.racesSubject.next(received.Data as Array<Race>);
      } else if (received.Command === ViewerCommands.Runners) {
        this.runnersSubject.next(received.Data as Array<Runner>);
      }
    });
  }

  connect() {
    this.ws.connect('viewer'); // Connect as viewer
  }

  disconnect() {
    this.ws.disconnect();
  }

  onPdfClick() {
    this.pdfClickSubject.next();
  }

  getRunners(raceid: number) {
    const msg = new Message<ViewerCommands>();
    msg.Command = ViewerCommands.GetRunners;
    msg.Data = raceid;
    this.ws.send(msg);
  }

  generatePdf(raceid: number) {
    const doc = new jsPDF();
    const race = this.raceArray.find(r => r.Id === raceid);

    doc.setFontSize(18);
    doc.text('Title', 14, 22);
    doc.setFontSize(11);
    doc.setTextColor(100);
    const pageSize = doc.internal.pageSize;
    const pageWidth = pageSize.width ? pageSize.width : pageSize.getWidth();
    const text = doc.splitTextToSize(, pageWidth - 35, {});
    doc.text(text, 14, 30);


    doc.autoTable({
      head: [['Name', 'Email', 'Country']],
      body: [
          ['David', 'david@example.com', 'Sweden'],
          ['Castille', 'castille@example.com', 'Norway']
      ]
  });
  doc.save('table.pdf');
  }
}
