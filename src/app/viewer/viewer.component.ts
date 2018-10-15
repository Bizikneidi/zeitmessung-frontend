import { Component, OnInit } from '@angular/core';
import { ViewerService } from '../services/viewer/viewer.service';
import { Subscription } from 'rxjs/Subscription';
import { TimeMeterState } from '../entities/timemeterstate';
import { MeasurementStart } from '../entities/measurementstart';

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.css']
})
export class ViewerComponent implements OnInit {

  measuring: boolean;
  viewerMessage: string = "Ready and waiting for a run to start!";
  prevTime: number = 0;
  curTime: number = 0;
  localStartTime: number = 0;


  timeMeter: TimeMeterState;
  mesStart: MeasurementStart;
  stopNum: number;
  stateSubscription: Subscription;
  startSubscription: Subscription;
  stopSubscription: Subscription;


  constructor(private viewerService: ViewerService) { 
    this.stateSubscription = this.viewerService.state.subscribe(tm => { 
      this.measuring = (tm == TimeMeterState.Measuring);
      this.setViewerMessage(tm);
     });
    this.startSubscription = this.viewerService.start.subscribe(ms => { 
      this.mesStart = ms;

      this.localStartTime = new Date().getMilliseconds();
      let timeDif = this.localStartTime -  this.mesStart.CurrentTime;
      this.localStartTime - timeDif;
    });
    this.stopSubscription = this.viewerService.stop.subscribe(sn => { 
      this.stopNum = sn; 
      this.prevTime = sn - this.mesStart.StartTime;
    });

    setInterval(() => {
      if(this.measuring){
        this.curTime = Date.now()- this.localStartTime;
        //console.log(this.curTime);
      }
    }, 0);
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.stateSubscription.unsubscribe();
    this.startSubscription.unsubscribe();
    this.stopSubscription.unsubscribe();
  }


  setViewerMessage(tm: TimeMeterState){
    switch(tm){
      case TimeMeterState.Ready:
        this.viewerMessage = "Ready and waiting for a run to start!";
        break;
      case TimeMeterState.MeasurementRequested:
        this.viewerMessage = "Measurement requested, waiting for station";
        break;
      case TimeMeterState.Measuring:
        this.viewerMessage = "Currently measuring";
        break;
      default:
        this.viewerMessage = "Measurement disabled or not working";
    }
  }
}
