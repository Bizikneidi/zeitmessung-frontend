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
  /**
   *left arrow icon
   *
   * @memberof CompetitionComponent
   */
  faArrow = faLongArrowAltLeft;
  /**
   *race to be created
   *
   * @type {Race}
   * @memberof CompetitionComponent
   */
  race: Race = new Race();
  /**
   *date field for validation
   *
   * @memberof CompetitionComponent
   */
  date = '';
  /**
   *time field for validation
   *
   * @memberof CompetitionComponent
   */
  time = '';

  /**
   *Creates an instance of CompetitionComponent.
   * @param {AdminService} admin
   * @param {Router} router
   * @memberof CompetitionComponent
   */
  constructor(private admin: AdminService, private router: Router) { }

  ngOnInit() {
    this.admin.connect();
  }

  /**
   *on click of create race button
   *creates the race and navigates back
   *
   * @memberof CompetitionComponent
   */
  onAddNewRaceClicked() {
    const date = new Date(`${this.date} ${this.time}`);
    const milliseconds = date.getTime();
    this.race.Date = milliseconds;
    this.admin.createRace(this.race);
    this.admin.disconnect();
    this.router.navigate(['/']);
  }
}
