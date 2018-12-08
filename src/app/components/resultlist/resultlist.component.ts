import { Component, OnInit, OnDestroy } from '@angular/core';
import { Runner } from '../../entities/runnner';
import { ActivatedRoute } from '@angular/router';
import { ViewerService } from '../../services/viewer/viewer.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-resultlist',
  templateUrl: './resultlist.component.html',
  styleUrls: ['./resultlist.component.css']
})
export class ResultlistComponent implements OnInit, OnDestroy {

  runners: Array<Runner> = [];

  runnersSub: Subscription;
  routerSub: Subscription;

  constructor(private route: ActivatedRoute, private viewers: ViewerService) {
  }

  ngOnInit() {
    this.runnersSub = this.viewers.runners.subscribe(runners => {
      this.runners = runners.sort((r1, r2) => r1.Time - r2.Time);
    });

    this.routerSub = this.route.queryParams.subscribe(evt => {
      this.getRunners();
    });
    this.getRunners();
  }

  ngOnDestroy() {
    this.runnersSub.unsubscribe();
    this.routerSub.unsubscribe();
  }

  getRunners() {
    const raceid = Number.parseInt(this.route.snapshot.queryParams.raceid);
    this.viewers.getRunners(raceid);
  }
}
