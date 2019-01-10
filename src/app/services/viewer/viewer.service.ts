import { Injectable } from '@angular/core';
import { WebsocketService } from '../websocket/websocket.service';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Message, ViewerCommands } from '../../entities/networking';
import { RaceManagerState } from '../../entities/racemanagerstate';
import { Participant } from '../../entities/participant';
import { Race } from '../../entities/race';
import { RunStart } from '../../entities/runstart';
import { ParticipantToRankPipe, ParticipantToSexRankPipe } from '../../pipes/participanttorankpipe';
import { MilliSecondsToTimePipe } from '../../pipes/millisecondstotimepipe';
import { RaceToStringPipe } from '../../pipes/racetostringpipe';
import { SexEnglishToGermanPipe } from '../../pipes/sexenglishtogermanpipe.pipe';

declare var jsPDF: any;

@Injectable()
export class ViewerService {

  public state: RaceManagerState;
  private raceArray: Array<Race>;
  private participantArray: Array<Participant>;

  // Observe start of run
  public start: Observable<RunStart>;
  private startSubject: Subject<RunStart>;

  // Observe participant finish run
  public measuredStop: Observable<Participant>;
  private measuredStopSubject: Subject<Participant>;

  // Observe end of run
  public end: Observable<null>;
  private endSubject: Subject<null>;

  // Observe all races
  public races: Observable<Array<Race>>;
  private racesSubject: Subject<Array<Race>>;

  // Observe all participants per race
  public participants: Observable<Array<Participant>>;
  private participantsSubject: Subject<Array<Participant>>;

  // Observe the pdf button click
  public pdfClick: Observable<null>;
  private pdfClickSubject: Subject<null>;

  constructor(private ws: WebsocketService, private rankPipe: ParticipantToRankPipe, private sexRankPipe: ParticipantToSexRankPipe,
    private millisecondsPipe: MilliSecondsToTimePipe, private raceToStringPipe: RaceToStringPipe,
    private sexEnglishGermanPipe: SexEnglishToGermanPipe) {

    this.startSubject = new Subject<RunStart>();
    this.start = this.startSubject.asObservable();

    this.measuredStopSubject = new Subject<Participant>();
    this.measuredStop = this.measuredStopSubject.asObservable();

    this.endSubject = new Subject<null>();
    this.end = this.endSubject.asObservable();

    this.racesSubject = new Subject<Array<Race>>();
    this.races = this.racesSubject.asObservable();
    this.races.subscribe(r => this.raceArray = r);

    this.participantsSubject = new Subject<Array<Participant>>();
    this.participants = this.participantsSubject.asObservable();
    this.participants.subscribe(p => this.participantArray = p);

    this.pdfClickSubject = new Subject<null>();
    this.pdfClick = this.pdfClickSubject.asObservable();

    this.ws.received.subscribe(msg => {
      // Cast to Viewer command and pass to correct observable
      const received = msg as Message<ViewerCommands>;
      if (received.Command === ViewerCommands.Status) {
        this.state = received.Data as RaceManagerState;
      } else if (received.Command === ViewerCommands.RunStart) {
        this.startSubject.next(received.Data as RunStart);
      } else if (received.Command === ViewerCommands.RunEnd) {
        this.endSubject.next();
      } else if (received.Command === ViewerCommands.ParticipantFinished) {
        this.measuredStopSubject.next(received.Data as Participant);
      } else if (received.Command === ViewerCommands.Races) {
        this.racesSubject.next(received.Data as Array<Race>);
      } else if (received.Command === ViewerCommands.Participants) {
        this.participantsSubject.next(received.Data as Array<Participant>);
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

  getParticipants(raceid: number) {
    const msg = new Message<ViewerCommands>();
    msg.Command = ViewerCommands.GetParticipants;
    msg.Data = raceid;
    this.ws.send(msg);
  }

  generatePdf(raceid: number) {
    if (this.participantArray) {
      const doc = new jsPDF('l');
      const totalPagesExp = '{total_pages_count_string}';

      const race = this.raceArray.find(r => r.Id === raceid);
      const participants = this.participantArray.filter(p => p.Race.Id === raceid);

      doc.setFontSize(18);
      doc.text(race.Title, 14, 22);
      doc.setFontSize(11);
      doc.setTextColor(100);

      const pageSize = doc.internal.pageSize;
      const pageWidth = pageSize.width ? pageSize.width : pageSize.getWidth();
      const text = doc.splitTextToSize('Ergebnisse ' + this.raceToStringPipe.transform(race), pageWidth - 35, {});
      doc.text(text, 14, 30);

      const head = [
        { title: 'Rang', dataKey: 'rank' },
        { title: 'Stnr', dataKey: 'stnr' },
        { title: 'Name', dataKey: 'name' },
        { title: 'Jg.', dataKey: 'year' },
        { title: 'Nat.', dataKey: 'nationality' },
        { title: 'Verein/Ort', dataKey: 'team' },
        { title: 'Klasse', dataKey: 'gender' },
        { title: 'KRg.', dataKey: 'classrank' },
        { title: 'Zeit', dataKey: 'time' },
      ];

      const tableParticipants = [];
      participants.forEach(p => {
        if (p) {
          tableParticipants.push({
            rank: this.rankPipe.transform(p, participants),
            stnr: p.Starter,
            name: p.Firstname + ' ' + p.Lastname,
            year: p.YearGroup,
            nationality: p.Nationality,
            team: p.Team,
            gender: this.sexEnglishGermanPipe.transform(p.Sex),
            classrank: this.sexRankPipe.transform(p, participants),
            time: this.millisecondsPipe.transform(p.Time) + ':' + this.millisecondsPipe.transform(p.Time, true)
          });
        }
      });

      tableParticipants.sort(function (a, b) {
        a = parseInt(a['rank'], 32);
        b = parseInt(b['rank'], 32);
        if (a <= 0) {
          return 1;
        }
        return a - b;
      });

      doc.autoTable(head, tableParticipants, {
        startY: 50,
        showHead: 'firstPage',
        headStyles: {
          fillColor: [38, 210, 179]
        },
        didDrawPage: function (data) {

          let str = 'Seite ' + doc.internal.getNumberOfPages();
          if (typeof doc.putTotalPages === 'function') {
            str = str + '/' + totalPagesExp;
          }
          doc.setFontSize(10);

          const pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();
          doc.text(str, data.settings.margin.left, pageHeight - 10);
        },
        margin: { top: 30 }
      });

      if (typeof doc.putTotalPages === 'function') {
        doc.putTotalPages(totalPagesExp);
      }

      doc.save('table.pdf');
    }

  }
}
