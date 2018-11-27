import { Component, OnInit } from '@angular/core';
import { Runner } from '../../entities/runnner';
import { Participant } from '../../entities/participant';
import { Race } from '../../entities/race';

@Component({
	selector: 'app-resultlist',
	templateUrl: './resultlist.component.html',
	styleUrls: ['./resultlist.component.css']
})
export class ResultlistComponent implements OnInit {

	runners: Array<Runner> = [];

	constructor() {
		this.getRunners();
		this.sortRunners();
	}

	ngOnInit() {
	}

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
	  this.runners = [
		{Starter: 12, Participant: new Participant('Peter', 'Hauer'), Time: 3680201, Race: new Race()},
		{Starter: 9, Participant: new Participant('Richard', 'Hoang'), Time: 3680013, Race: new Race()},
		{Starter: 10, Participant: new Participant('Severin', 'Berger'), Time: 36802344, Race: new Race()},
		{Starter: 9, Participant: new Participant('Richard', 'Hoang'), Time: 0, Race: new Race()},
		{Starter: 10, Participant: new Participant('Severin', 'Berger'), Time: 0, Race: new Race()},
		{Starter: 9, Participant: new Participant('Richard', 'Hoang'), Time: 0, Race: new Race()},
		{Starter: 10, Participant: new Participant('Severin', 'Berger'), Time: 0, Race: new Race()},
		{Starter: 9, Participant: new Participant('Richard', 'Hoang'), Time: 0, Race: new Race()},
		{Starter: 10, Participant: new Participant('Severin', 'Berger'), Time: 0, Race: new Race()},
		{Starter: 9, Participant: new Participant('Richard', 'Hoang'), Time: 0, Race: new Race()},
		{Starter: 10, Participant: new Participant('Severin', 'Berger'), Time: 0, Race: new Race()},
		{Starter: 9, Participant: new Participant('Richard', 'Hoang'), Time: 0, Race: new Race()},
		{Starter: 10, Participant: new Participant('Severin', 'Berger'), Time: 0, Race: new Race()}
	  ];
  }

}
