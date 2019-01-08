import { Component, OnInit } from '@angular/core';
import { faLongArrowAltLeft, faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { ParticipantService } from '../../services/participant/participant.service';

@Component({
  selector: 'app-participantracechooser',
  templateUrl: './participantracechooser.component.html',
  styleUrls: ['./participantracechooser.component.css']
})
export class ParticipantracechooserComponent implements OnInit {

  faArrow = faLongArrowAltLeft;
  faArrowRight = faLongArrowAltRight;

  getData() {
    return null;
  }

  constructor(private router: Router, private service: ParticipantService) {
    //router.#
    service.connect();
  }

  ngOnInit() {
  }

}
