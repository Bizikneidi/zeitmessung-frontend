import { Component, OnInit } from '@angular/core';
import { faLongArrowAltLeft, faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons';
import { ParticipantService } from '../../../services/participant/participant.service';

@Component({
  selector: 'app-participantracechooser',
  templateUrl: './participantracechooser.component.html',
  styleUrls: ['./participantracechooser.component.css']
})
export class ParticipantracechooserComponent implements OnInit {

  /**
   *left arrow icon
   *
   * @memberof ParticipantracechooserComponent
   */
  faArrow = faLongArrowAltLeft;
  /**
   *right arrow icon
   *
   * @memberof ParticipantracechooserComponent
   */
  faArrowRight = faLongArrowAltRight;

  /**
   *Creates an instance of ParticipantracechooserComponent.
   * @param {ParticipantService} service
   * @memberof ParticipantracechooserComponent
   */
  constructor(public service: ParticipantService) {
  }

  ngOnInit() {
    this.service.connect();
  }

  /**
   *on back clicked
   *disconnects from service
   *
   * @memberof ParticipantracechooserComponent
   */
  onBack() {
    this.service.disconnect();
  }
}
