import { Component, OnInit } from '@angular/core';
import { faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons';
import { Participant} from '../entities/participant';
import { CountryISO } from '../entities/countryISO';

@Component({
  selector: 'app-registerparticipant',
  templateUrl: './registerparticipant.component.html',
  styleUrls: ['./registerparticipant.component.css']
})
export class RegisterparticipantComponent implements OnInit {

  icon = faLongArrowAltLeft;
  participant = new Participant();
  countryISO: Array<CountryISO> = null;

  constructor() {
  }

  ngOnInit() {
  }

  changeSex(c) {
    this.participant.Sex = c;
  }

  register() {
  }

  createCountryISO() {
    this.countryISO = Array<CountryISO>(CountryISO.)
    for(var country in CountryISO) {

    }
  }
}
