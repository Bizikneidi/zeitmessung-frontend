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
    {Starter: 9, Participant: new Participant('Richard', 'Hoang'), Time: new Time(0, 0), Race: new Race()},
    {Starter: 10, Participant: new Participant('Severin', 'Berger'), Time: new Time(2, 0), Race: new Race()}
  ];

  constructor() { }

  ngOnInit() {
  }

}
