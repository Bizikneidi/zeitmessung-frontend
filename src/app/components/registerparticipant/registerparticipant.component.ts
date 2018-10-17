import { Component, Directive, OnInit, OnDestroy } from '@angular/core';
import { faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons';
import { Participant } from '../../entities/participant';
import { CountryList } from '../../entities/countryList';
import { ParticipantService } from '../../services/participant/participant.service';

@Component({
  selector: 'app-registerparticipant',
  templateUrl: './registerparticipant.component.html',
  styleUrls: ['./registerparticipant.component.css']
})
export class RegisterparticipantComponent implements OnInit, OnDestroy {

  faArrow = faLongArrowAltLeft;
  participant: Participant;
  countryList = CountryList.ListOfCountries;

  constructor(private ps: ParticipantService) { }

  ngOnInit() {
    this.ps.connect();
    this.participant = new Participant();
    this.participant.Sex = null;
  }

  changeSex(c) {
    this.participant.Sex = c;
  }

  sexAndCountryAreSet(): Boolean {
    return this.participant.Sex !== null && this.participant.Nationality !== 'Nationalitaet';
  }

  register() {
    this.ps.register(this.participant);
  }

  ngOnDestroy() {
    this.ps.disconnect();
  }
}
