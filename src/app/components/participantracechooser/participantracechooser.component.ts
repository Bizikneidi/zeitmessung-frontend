import { Component, OnInit } from '@angular/core';
import { faLongArrowAltLeft, faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { ParticipantService } from '../../services/participant/participant.service';
import { Race } from '../../entities/race';

@Component({
  selector: 'app-participantracechooser',
  templateUrl: './participantracechooser.component.html',
  styleUrls: ['./participantracechooser.component.css']
})
export class ParticipantracechooserComponent implements OnInit {

  faArrow = faLongArrowAltLeft;
  faArrowRight = faLongArrowAltRight;
  races: Array<Race> = [];

  constructor(private router: Router, private service: ParticipantService) {
    service.connect();
    service.races.subscribe(data => {
      this.races = data;
    })
  }

  ngOnInit() {
  }

}
