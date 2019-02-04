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
  /**
   *list of all races
   *
   * @private
   * @type {Array<Race>}
   * @memberof ViewerService
   */
  private raceArray: Array<Race>;
  /**
   *list of all participants
   *
   * @private
   * @type {Array<Participant>}
   * @memberof ViewerService
   */
  private participantArray: Array<Participant>;

  /**
   *Observe start of run
   *
   * @type {Observable<RunStart>}
   * @memberof ViewerService
   */
  public start: Observable<RunStart>;
  private startSubject: Subject<RunStart>;

  /**
   *Observe participant finish run
   *
   * @type {Observable<Participant>}
   * @memberof ViewerService
   */
  public measuredStop: Observable<Participant>;
  private measuredStopSubject: Subject<Participant>;

  /**
   *Observe end of run
   *
   * @type {Observable<null>}
   * @memberof ViewerService
   */
  public end: Observable<null>;
  private endSubject: Subject<null>;


  /**
   *Observe all races
   *
   * @type {Observable<Array<Race>>}
   * @memberof ViewerService
   */
  public races: Observable<Array<Race>>;
  private racesSubject: Subject<Array<Race>>;

  /**
   *Observe all participants per startrace
   *
   * @type {Observable<Array<Participant>>}
   * @memberof ViewerService
   */
  public participants: Observable<Array<Participant>>;
  private participantsSubject: Subject<Array<Participant>>;

  /**
   *Observe the pdf button click
   *
   * @type {Observable<null>}
   * @memberof ViewerService
   */
  public pdfClick: Observable<null>;
  private pdfClickSubject: Subject<null>;

  /**
   *Creates an instance of ViewerService.
   * @param {WebsocketService} ws
   * @param {ParticipantToRankPipe} rankPipe
   * @param {ParticipantToSexRankPipe} sexRankPipe
   * @param {MilliSecondsToTimePipe} millisecondsPipe
   * @param {RaceToStringPipe} raceToStringPipe
   * @param {SexEnglishToGermanPipe} sexEnglishGermanPipe
   * @memberof ViewerService
   */
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

  /**
   *connect to ws as viewer
   *
   * @memberof ViewerService
   */
  connect() {
    this.ws.connect('viewer');
  }

  /**
   *disconnect from ws
   *
   * @memberof ViewerService
   */
  disconnect() {
    this.ws.disconnect();
  }

  /**
   *call generation of pdf
   *
   * @memberof ViewerService
   */
  onPdfClick() {
    this.pdfClickSubject.next();
  }

  /**
   *get all participants for specific startrace from the ws
   *
   * @param {number} raceid
   * @memberof ViewerService
   */
  getParticipants(raceid: number) {
    const msg = new Message<ViewerCommands>();
    msg.Command = ViewerCommands.GetParticipants;
    msg.Data = raceid;
    this.ws.send(msg);
  }

  /**
   *generate pdf of specific startrace
   *using jsPdf and jsPdfAutoTable
   *
   * @param {number} raceid
   * @memberof ViewerService
   */
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
      const text = doc.splitTextToSize('Ergebnisse ' + this.raceToStringPipe.transform(race, true), pageWidth - 35, {});
      doc.text(text, 14, 30); // set header text

      // header of the table
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

      // generate and parse the data
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

      // sorts the data
      tableParticipants.sort((a, b) =>  {
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
        // generates the pagenumber
        didDrawPage: data => {

          let str = 'Seite ' + doc.internal.getNumberOfPages();
          if (typeof doc.putTotalPages === 'function') {
            str = str + '/' + totalPagesExp;
          }
          doc.setFontSize(10);

          const pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();
          doc.text(str, data.settings.margin.left, pageHeight - 10);
        },
        margin: { top: 30 }
      }); // assign data to the table

      // checks if putTotalPages exists
      if (typeof doc.putTotalPages === 'function') {
        doc.putTotalPages(totalPagesExp);
      }

      doc.save(race.Title.replace(/\s/g, '_') + '.pdf');
    }

  }
}
