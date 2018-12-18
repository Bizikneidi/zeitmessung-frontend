import { Component, OnInit } from '@angular/core';
import { faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-participantracechooser',
  templateUrl: './participantracechooser.component.html',
  styleUrls: ['./participantracechooser.component.css']
})
export class ParticipantracechooserComponent implements OnInit {

  faArrow = faLongArrowAltLeft;
  sampleData = [
    {
      Id: 1,
      Title: "Marathon",
      Date: 123456789
    },
    {
      Id: 2,
      Title: "Marathon",
      Date: 123456789
    },
    {
      Id: 3,
      Title: "Marathon",
      Date: 123456789
    },
    {
      Id: 4,
      Title: "Marathon",
      Date: 123456789
    },
    {
      Id: 5,
      Title: "Marathon",
      Date: 123456789
    },
    {
      Id: 6,
      Title: "Marathon",
      Date: 123456789
    },
    {
      Id: 7,
      Title: "Marathon",
      Date: 123456789
    },
    {
      Id: 8,
      Title: "Marathon",
      Date: 123456789
    },
  ];

  getData() {
    return this.sampleData;
  }

  constructor() { }

  ngOnInit() {
  }

}
