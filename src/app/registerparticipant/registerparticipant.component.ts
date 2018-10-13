import { Component, OnInit } from '@angular/core';
import { faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons';
import { Participant} from '../entities/participant';

@Component({
  selector: 'app-registerparticipant',
  templateUrl: './registerparticipant.component.html',
  styleUrls: ['./registerparticipant.component.css']
})
export class RegisterparticipantComponent implements OnInit {

  icon = faLongArrowAltLeft;
  participant = new Participant();

  constructor() {
  }

  ngOnInit() {
  }

  changeSex(c) {
    this.participant.Sex = c;
  }

  register() {
  }
}
