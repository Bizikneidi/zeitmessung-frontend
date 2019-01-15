import { Component, OnInit } from '@angular/core';
import { faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons';
import { Race } from '../../../entities/race';
import { Router } from '@angular/router';
import { AdminService } from '../../../services/admin/admin.service';

@Component({
  selector: 'app-competition',
  templateUrl: './competition.component.html',
  styleUrls: ['./competition.component.css']
})
export class CompetitionComponent implements OnInit {
  faArrow = faLongArrowAltLeft;
  race: Race = new Race();
  date = '';
  time = '';

  constructor(private routing: Router, private admin: AdminService) { }

  ngOnInit() {
  }

  onAddNewRaceClicked() {
    const date = new Date(`${this.date} ${this.time}`);
    const milliseconds = date.getTime();
    this.race.Date = milliseconds;
    this.admin.createRace(this.race);
    this.routing.navigate(['admin']);
    alert('f');
  }

}
