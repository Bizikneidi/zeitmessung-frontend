import { Component, OnInit, OnDestroy } from '@angular/core';
import { faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons';
import { AdminService } from '../../../services/admin/admin.service';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  /**
   *left arrow icon
   *
   * @memberof AdminComponent
   */
  faArrow = faLongArrowAltLeft;
  /**
   *boolean if the start button is enabled
   *
   * @memberof AdminComponent
   */
  startable = false;
  /**
   *id of the selected startrace
   *
   * @memberof AdminComponent
   */
  raceId = -1;

  /**
   *Creates an instance of AdminComponent.
   * @param {AdminService} admin
   * @memberof AdminComponent
   */
  constructor(public admin: AdminService) {
  }

  ngOnInit() {
    this.admin.connect(); // Connect as Admin on page visit
  }

  /**
   *on startrace selected
   *
   * @param {number} id
   * @memberof AdminComponent
   */
  onSelected(id: number) {
    this.raceId = id;
    this.startable = true;
  }

  onBack() {
    this.admin.disconnect();
  }
}
