import { Component, OnInit } from '@angular/core';
import { faUserCog, faBinoculars } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-navigationcards',
  templateUrl: './navigationcards.component.html',
  styleUrls: ['./navigationcards.component.css']
})
export class NavigationcardsComponent implements OnInit {
  faAdmin = faUserCog;
  faBinoculars = faBinoculars;
  constructor() { }

  ngOnInit() {
  }

}
