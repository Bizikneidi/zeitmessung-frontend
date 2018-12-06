import { Component, OnInit } from '@angular/core';
import { Runner } from '../../entities/runnner';
import { Participant } from '../../entities/participant';
import { Race } from '../../entities/race';
import {Router, ActivatedRoute, RoutesRecognized} from '@angular/router';
import {ViewerService} from '../../services/viewer/viewer.service';

@Component({
	selector: 'app-resultlist',
	templateUrl: './resultlist.component.html',
	styleUrls: ['./resultlist.component.css']
})
export class ResultlistComponent implements OnInit {

	runners: Array<Runner> = [];
	raceid = -1;

	constructor(
    private route: ActivatedRoute,
    private router: Router,
    private viewers: ViewerService) {

		this.router.events.subscribe(evt => {
		  this.raceid = this.route.snapshot.queryParams.raceid;
		  this.getRunners();
    });
	}

	ngOnInit() { }

	sortRunners() {
		for (let i = 0; i < this.runners.length; i++) {
			for (let j = 0; j < this.runners.length; j++) {
				if (this.getEffectiveTime(this.runners[i]) < this.getEffectiveTime(this.runners[j])) {
					const temp = this.runners[i];
					this.runners[i] = this.runners[j];
					this.runners[j] = temp;
				}
			}
		}
	}

	private getEffectiveTime(runner: Runner) {
		return runner.Time;
	}

  private getRunners() {
    console.log('i am in getRunners');
    this.viewers.runners.subscribe(runners => {
      console.log('i am in getRunners in subscribe');
      console.log(runners);
      this.runners = runners;
      this.sortRunners();
    });

	  this.viewers.getRunners(this.raceid);
  }

}
