import { Component, OnInit } from '@angular/core';
import { faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-participantracechooser',
  templateUrl: './participantracechooser.component.html',
  styleUrls: ['./participantracechooser.component.css']
})
export class ParticipantracechooserComponent implements OnInit {

  faArrow = faLongArrowAltLeft;

  constructor() { }

  ngOnInit() {
  }

}
