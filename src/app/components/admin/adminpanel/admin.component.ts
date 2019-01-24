import { Component, OnInit, OnDestroy } from '@angular/core';
import { faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons';
import { AdminService } from '../../../services/admin/admin.service';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  faArrow = faLongArrowAltLeft; // arrow icon
  startable = false;
  raceId = -1;

  constructor(public admin: AdminService) {
  }

  ngOnInit() {
    this.admin.connect(); // Connect as Admin on page visit
  }

  // on race selected
  onSelected(id: number) {
    this.raceId = id;
    this.startable = true;
  }

  onBack() {
    this.admin.disconnect();
  }
}
