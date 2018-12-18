import { Component, OnInit } from '@angular/core';
import { faLongArrowAltLeft, faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-participantracechooser',
  templateUrl: './participantracechooser.component.html',
  styleUrls: ['./participantracechooser.component.css']
})
export class ParticipantracechooserComponent implements OnInit {

  faArrow = faLongArrowAltLeft;
  faArrowRight = faLongArrowAltRight;
  sampleData = [
    {
      Id: 1,
      Title: "Marathon",
      Date: 123456789,
      Link: ""
    },
    {
      Id: 2,
      Title: "Marathon",
      Date: 123456789,
      Link: ""
    },
    {
      Id: 3,
      Title: "Marathon",
      Date: 123456789,
      Link: ""
    },
    {
      Id: 4,
      Title: "Marathon",
      Date: 123456789,
      Link: ""
    },
    {
      Id: 5,
      Title: "Marathon",
      Date: 123456789,
      Link: ""
    },
    {
      Id: 6,
      Title: "Marathon",
      Date: 123456789,
      Link: ""
    },
    {
      Id: 7,
      Title: "Marathon",
      Date: 123456789,
      Link: ""
    },
    {
      Id: 8,
      Title: "Marathon",
      Date: 123456789,
      Link: ""
    },
  ];

  getData() {
    return this.sampleData;
  }

  constructor() { }

  ngOnInit() {
  }

}
