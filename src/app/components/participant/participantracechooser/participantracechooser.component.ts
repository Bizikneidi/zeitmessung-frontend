import { Component, OnInit } from '@angular/core';
import { faLongArrowAltLeft, faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons';
import { ParticipantService } from '../../../services/participant/participant.service';

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
  }

  ngOnInit() {
    this.service.connect();
  }

  onBack() {
    this.service.disconnect();
  }
}
