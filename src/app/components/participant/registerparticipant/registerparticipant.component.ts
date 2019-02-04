import { Component, OnInit, OnDestroy } from '@angular/core';
import { faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons';
import { Participant } from '../../../entities/participant';
import { CountryList } from '../../../entities/countryList';
import { ParticipantService } from '../../../services/participant/participant.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Race } from '../../../entities/race';

@Component({
  selector: 'app-registerparticipant',
  templateUrl: './registerparticipant.component.html',
  styleUrls: ['./registerparticipant.component.css']
})
export class RegisterparticipantComponent implements OnInit {

  /**
   *left arrow icon
   *
   * @memberof RegisterparticipantComponent
   */
  faArrow = faLongArrowAltLeft;
  /**
   *participant to be registered
   *
   * @type {Participant}
   * @memberof RegisterparticipantComponent
   */
  participant: Participant;
  /**
   *list of all country codes
   *
   * @memberof RegisterparticipantComponent
   */
  countryList = CountryList.ListOfCountries;
  /**
   *boolean if agreement is checked
   *
   * @memberof RegisterparticipantComponent
   */
  agreed = false;

  /**
   *Creates an instance of RegisterparticipantComponent.
   * @param {ParticipantService} ps
   * @param {ActivatedRoute} route
   * @memberof RegisterparticipantComponent
   */
  constructor(private ps: ParticipantService, private route: ActivatedRoute) { }

  ngOnInit() {
    // create empty participant
    this.participant = new Participant();
    this.participant.Sex = null;
    this.ps.connect();

    this.route.params.subscribe(params => {
      this.participant.Race = new Race();
      this.participant.Race.Id = +params['id'];
   });
  }

  /**
   *Must be changed via ts because custom checkboxes don't support binding
   *
   * @param {*} c
   * @memberof RegisterparticipantComponent
   */
  changeSex(c) {
    this.participant.Sex = c;
  }

  /**
   *Required attribute does not work due to default values
   *
   * @returns {Boolean}
   * @memberof RegisterparticipantComponent
   */
  sexAndCountryAreSet(): Boolean {
    return this.participant.Sex !== null;
  }

  /**
   *registers participant
   *
   * @memberof RegisterparticipantComponent
   */
  register() {
    this.ps.register(this.participant);
    this.ps.disconnect();
  }

  /**
   *sets agreement to new value
   *
   * @memberof RegisterparticipantComponent
   */
  onAgreementClicked() {
    this.agreed = !this.agreed;
  }

}
