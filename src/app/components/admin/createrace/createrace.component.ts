import { Component, OnInit, OnDestroy } from '@angular/core';
import { faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons';
import { Race } from '../../../entities/race';
import { AdminService } from '../../../services/admin/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-competition',
  templateUrl: './createrace.component.html',
  styleUrls: ['./createrace.component.css']
})
export class CreateRaceComponent implements OnInit {
  /**
   *left arrow icon
   *
   * @memberof CreateRaceComponent
   */
  faArrow = faLongArrowAltLeft;
  /**
   *startrace to be created
   *
   * @type {Race}
   * @memberof CreateRaceComponent
   */
  race: Race = new Race();
  /**
   *date field for validation
   *
   * @memberof CreateRaceComponent
   */
  date = '';
  /**
   *time field for validation
   *
   * @memberof CreateRaceComponent
   */
  time = '';

  /**
   *Creates an instance of CreateRaceComponent.
   * @param {AdminService} admin
   * @param {Router} router
   * @memberof CreateRaceComponent
   */
  constructor(private admin: AdminService, private router: Router) { }

  ngOnInit() {
    this.admin.connect();
  }

  /**
   *on click of create startrace button
   *creates the startrace and navigates back
   *
   * @memberof CreateRaceComponent
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
