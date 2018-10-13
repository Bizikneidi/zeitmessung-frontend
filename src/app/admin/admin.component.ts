import { Component, OnInit } from '@angular/core';
import { faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons';
import { AdminService } from '../services/admin/admin.service';
import { Message, AdminCommands } from '../entities/networking';
import { TimeMeterState } from '../entities/timemeterstate';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  faArrow = faLongArrowAltLeft;
  notready = true;
  message: string;
  readyMessage = 'A station is connected, press start to start a race!';
  disabledMessage = 'You can press start, once a station has connected';
  measureMessage = 'Currently measuring';
  constructor(public service: AdminService) {
    this.message = this.disabledMessage;
  }

  ngOnInit() {
     this.service.state.subscribe((data: TimeMeterState) => {
        if (data === TimeMeterState.Ready) {
          this.notready = false;
          this.message = this.readyMessage;

        }
        else if (data === TimeMeterState.Measuring) {
          this.notready = true;
          this.message = this.measureMessage;
        }
        else if (data === TimeMeterState.Disabled) {
          this.notready = true;
          this.message = this.disabledMessage;
        }
     });
  }

  onStartRunClicked() {
    this.service.startRun();
    // this.notready = true;
  }


}
