import { Component, OnInit } from '@angular/core';
import { faLongArrowAltLeft, faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { ParticipantService } from '../../../services/participant/participant.service';
import { Race } from '../../../entities/race';

@Component({
  selector: 'app-participantracechooser',
  templateUrl: './participantracechooser.component.html',
  styleUrls: ['./participantracechooser.component.css']
})
export class ParticipantracechooserComponent implements OnInit {

  // Arrows for the frontend
  faArrow = faLongArrowAltLeft;
  faArrowRight = faLongArrowAltRight;

  constructor(public service: ParticipantService) {
    service.connect();
  }

  ngOnInit() {
  }

}
