import { Component, OnInit, OnDestroy } from '@angular/core';
import { Participant } from '../../../entities/participant';
import { ActivatedRoute } from '@angular/router';
import { ViewerService } from '../../../services/viewer/viewer.service';
import { Subscription } from 'rxjs/Subscription';
import { slideAnimation } from '../../../animations/animations';
import { SortParticipantListPipe } from '../../../pipes/sortparticipantlist.pipe';

@Component({
  selector: 'app-resultlist',
  templateUrl: './resultlist.component.html',
  styleUrls: ['./resultlist.component.css'],
  animations: [slideAnimation]
})
export class ResultlistComponent implements OnInit, OnDestroy {

  /**
   *list of all current participants
   *
   * @type {Array<Participant>}
   * @memberof ResultlistComponent
   */
  participants: Array<Participant> = [];

  participantsSub: Subscription;
  routerSub: Subscription;
  pdfSub: Subscription;

  /**
   *Creates an instance of ResultlistComponent.
   * @param {ActivatedRoute} route
   * @param {ViewerService} viewers
   * @param {SortParticipantListPipe} sortParticipantListPipe
   * @memberof ResultlistComponent
   */
  constructor(private route: ActivatedRoute, private viewers: ViewerService, private sortParticipantListPipe: SortParticipantListPipe) {
  }

  ngOnInit() {
    this.pdfSub = this.viewers.pdfClick.subscribe(() => {
      this.viewers.generatePdf(Number.parseInt(this.route.snapshot.queryParams.raceid));
    });

    this.participantsSub = this.viewers.participants.subscribe(participants => {
      this.participants = this.sortParticipantListPipe.transform(participants, true);
    });

    this.routerSub = this.route.queryParams.subscribe(() => {
      this.getParticipants();
    });
    this.getParticipants();
  }

  ngOnDestroy() {
    if (this.participantsSub && !this.participantsSub.closed) {
      this.participantsSub.unsubscribe();
    }
    if (this.routerSub && !this.routerSub.closed) {
      this.routerSub.unsubscribe();
    }
    if (this.pdfSub && !this.pdfSub.closed) {
      this.pdfSub.unsubscribe();
    }
  }

  /**
   *get all participant for current race
   *
   * @memberof ResultlistComponent
   */
  getParticipants() {
    const raceid = Number.parseInt(this.route.snapshot.queryParams.raceid);
    this.viewers.getParticipants(raceid);
  }
}
