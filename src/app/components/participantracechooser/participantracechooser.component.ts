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

  // Arrows for the frontend
  faArrow = faLongArrowAltLeft;
  faArrowRight = faLongArrowAltRight;

  // races to show
  races: Array<Race> = [];

  constructor(private service: ParticipantService) {
    service.connect();
    service.races.subscribe(data => {
      // assign fetched data to the races to display
      this.races = data;
    })
  }

  ngOnInit() {
  }

}
