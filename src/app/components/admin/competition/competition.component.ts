import { Component, OnInit, OnDestroy } from '@angular/core';
import { faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons';
import { Race } from '../../../entities/race';
import { AdminService } from '../../../services/admin/admin.service';
import { Router } from '@angular/router';

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

  constructor(private admin: AdminService, private router: Router) { }

  ngOnInit() {
    this.admin.connect();
  }

  onAddNewRaceClicked() {
    const date = new Date(`${this.date} ${this.time}`);
    const milliseconds = date.getTime();
    this.race.Date = milliseconds;
    this.admin.createRace(this.race);
    this.admin.disconnect();
    this.router.navigate(['/']);
  }
}
