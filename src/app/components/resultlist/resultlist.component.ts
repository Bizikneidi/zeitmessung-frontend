import { Component, OnInit, OnDestroy } from '@angular/core';
import { Participant } from '../../entities/participant';
import { ActivatedRoute } from '@angular/router';
import { ViewerService } from '../../services/viewer/viewer.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-resultlist',
  templateUrl: './resultlist.component.html',
  styleUrls: ['./resultlist.component.css']
})
export class ResultlistComponent implements OnInit, OnDestroy {

  participants: Array<Participant> = [];

  participantsSub: Subscription;
  routerSub: Subscription;
  pdfSub: Subscription;

  constructor(private route: ActivatedRoute, private viewers: ViewerService) {
  }

  ngOnInit() {
    this.pdfSub = this.viewers.pdfClick.subscribe(() => {
      this.viewers.generatePdf(Number.parseInt(this.route.snapshot.queryParams.raceid));
    });

    this.participantsSub = this.viewers.participants.subscribe(participants => {
      this.participants = participants.sort((p1, p2) => {
        if (p1.Time <= 0) {
          return 1;
        }
        return p1.Time - p2.Time;
      });
    });

    this.routerSub = this.route.queryParams.subscribe(evt => {
      this.getParticipants();
    });
    this.getParticipants();
  }

  ngOnDestroy() {
    this.participantsSub.unsubscribe();
    this.routerSub.unsubscribe();
    this.pdfSub.unsubscribe();
  }

  getParticipants() {
    const raceid = Number.parseInt(this.route.snapshot.queryParams.raceid);
    this.viewers.getParticipants(raceid);
  }
}
