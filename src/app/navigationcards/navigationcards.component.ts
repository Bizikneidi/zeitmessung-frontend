import { Component, OnInit } from '@angular/core';
import { faUserCog, faBinoculars } from '@fortawesome/free-solid-svg-icons';
import { AdminService } from '../services/admin/admin.service';
import { ViewerService } from '../services/viewer/viewer.service';
@Component({
  selector: 'app-navigationcards',
  templateUrl: './navigationcards.component.html',
  styleUrls: ['./navigationcards.component.css']
})
export class NavigationcardsComponent implements OnInit {
  faAdmin = faUserCog;
  faBinoculars = faBinoculars;
  constructor(private as: ViewerService) {
  }

  ngOnInit() {
  }

}
