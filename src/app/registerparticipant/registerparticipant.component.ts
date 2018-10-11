import { Component, OnInit } from '@angular/core';
import { faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-registerparticipant',
  templateUrl: './registerparticipant.component.html',
  styleUrls: ['./registerparticipant.component.css']
})
export class RegisterparticipantComponent implements OnInit {

  icon = faLongArrowAltLeft;

  constructor() { }

  ngOnInit() {
  }

}
