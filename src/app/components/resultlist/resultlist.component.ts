import { Component, OnInit } from '@angular/core';
import {Runner} from '../../entities/runnner';
import {Participant} from '../../entities/participant';
import {Time} from '../../entities/time';
import {Race} from '../../entities/race';

@Component({
  selector: 'app-resultlist',
  templateUrl: './resultlist.component.html',
  styleUrls: ['./resultlist.component.css']
})
export class ResultlistComponent implements OnInit {

  runners: Array<Runner> = [
    {Starter: 12, Participant: new Participant('Peter', 'Hauer'), Time: new Time(1, 0), Race: new Race()},
    {Starter: 9, Participant: new Participant('Richard', 'Hoang'), Time: new Time(2, 0), Race: new Race()},
    {Starter: 10, Participant: new Participant('Severin', 'Berger'), Time: new Time(3, 0), Race: new Race()},
    {Starter: 9, Participant: new Participant('Richard', 'Hoang'), Time: new Time(4, 0), Race: new Race()},
    {Starter: 10, Participant: new Participant('Severin', 'Berger'), Time: new Time(5, 0), Race: new Race()},
    {Starter: 9, Participant: new Participant('Richard', 'Hoang'), Time: new Time(13, 0), Race: new Race()},
    {Starter: 10, Participant: new Participant('Severin', 'Berger'), Time: new Time(12, 0), Race: new Race()},
    {Starter: 9, Participant: new Participant('Richard', 'Hoang'), Time: new Time(11, 0), Race: new Race()},
    {Starter: 10, Participant: new Participant('Severin', 'Berger'), Time: new Time(10, 0), Race: new Race()},
    {Starter: 9, Participant: new Participant('Richard', 'Hoang'), Time: new Time(9, 0), Race: new Race()},
    {Starter: 10, Participant: new Participant('Severin', 'Berger'), Time: new Time(8, 0), Race: new Race()},
    {Starter: 9, Participant: new Participant('Richard', 'Hoang'), Time: new Time(7, 0), Race: new Race()},
    {Starter: 10, Participant: new Participant('Severin', 'Berger'), Time: new Time(6, 0), Race: new Race()}
  ];

  constructor() {
	  this.sortRunners();
  }

  ngOnInit() {
  }

  sortRunners() {
	for(let i = 0; i < this.runners.length; i++) {
		for(let j = 0; j < this.runners.length; j++) {
			if(this.getEffectiveTime(this.runners[i]) < this.getEffectiveTime(this.runners[j])) {
				let temp = this.runners[i];
				this.runners[i] = this.runners[j];
				this.runners[j] = temp;
			}
		}
	}
  }

  private getEffectiveTime(runner: Runner) {
	  return runner.Time.End - runner.Time.Start;
  }

}
