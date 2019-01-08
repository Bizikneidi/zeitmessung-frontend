import { Component, OnInit, OnDestroy } from '@angular/core';
import { faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons';
import { Participant } from '../../entities/participant';
import { CountryList } from '../../entities/countryList';
import { ParticipantService } from '../../services/participant/participant.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Race } from '../../entities/race';

@Component({
  selector: 'app-registerparticipant',
  templateUrl: './registerparticipant.component.html',
  styleUrls: ['./registerparticipant.component.css']
})
export class RegisterparticipantComponent implements OnInit, OnDestroy {

  faArrow = faLongArrowAltLeft;
  participant: Participant;
  countryList = CountryList.ListOfCountries;
  agreed = false;
  raceid = 0;

  constructor(
    private ps: ParticipantService,
    private route: ActivatedRoute,
    private router: Router) {
    }

  ngOnInit() {
    // create empty participant
    this.participant = new Participant();
    this.participant.Sex = null;
    this.ps.connect();

    this.route.params.subscribe(params => {
      this.raceid = +params['id'];
      this.participant.Race = new Race();
      this.participant.Race.Id = +params['id'];
   });
  }

  ngOnDestroy() {
    this.ps.disconnect();
  }

  changeSex(c) {
    // Must be changed via ts because custom checkboxes don't support binding
    this.participant.Sex = c;
  }

  sexAndCountryAreSet(): Boolean {
    // Required attribute does not work due to default values
    return this.participant.Sex !== null;
  }

  register() {
    this.ps.register(this.participant);
  }

  onAgreementClicked() {
    this.agreed = !this.agreed;
  }

}
