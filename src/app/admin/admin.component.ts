import { Component, OnInit } from '@angular/core';
import { faUser, faLock, faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  faArrow = faLongArrowAltLeft;
  constructor() { }

  ngOnInit() {
  }

}
