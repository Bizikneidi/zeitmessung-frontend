import { Component, OnInit } from '@angular/core';
import { faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons';
import { Participant} from '../entities/participant';
import { CountryList, Country } from '../entities/countryList';
import {ParticipantService} from '../services/participant/participant.service';
import {FormGroup, FormBuilder, Validators, FormControl, PatternValidator} from '@angular/forms';
import { FormGroupDirective  } from '@angular/forms';
@Component({
  
  selector: 'app-registerparticipant',
  templateUrl: './registerparticipant.component.html',
  styleUrls: ['./registerparticipant.component.css']
})
export class RegisterparticipantComponent implements OnInit {
  clicked=false;
  icon = faLongArrowAltLeft;
  participant = new Participant();
  countryList = CountryList.ListOfCountries;
  participantForm: FormGroup;
  constructor(private ws: ParticipantService, private fb: FormBuilder) {
  }

  ngOnInit() {
    this.participantForm = new FormGroup({
      firstname : new FormControl ('hello',  [Validators.required, Validators.pattern('^([A-ZÄÜÖ][a-zäüö]+)([ ][A-ZÄÜÖ][a-zäüö]+)*$')])
    });
  }

  changeSex(c) {
    this.participant.Sex = c;
  }

  register() {
    this.ws.register(this.participant);
    this.ws.disconnect();
  }

  onAgreementClicked(){
    
    this.clicked=!this.clicked;
  }
}
