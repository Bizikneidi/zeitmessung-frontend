import { Component, OnInit } from '@angular/core';
import { Runner } from '../../entities/runnner';
import { Participant } from '../../entities/participant';
import { Time } from '../../entities/time';
import { Race } from '../../entities/race';
import { ViewerService } from '../../services/viewer/viewer.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-liveresultlist',
  templateUrl: './liveresultlist.component.html',
  styleUrls: ['./liveresultlist.component.css']
})
export class LiveresultlistComponent implements OnInit {


  participantList: Array<Runner> = [{Starter: 12, Participant: new Participant('Peter', 'Hauer'), Time: new Time, Race: new Race()},
                                    {Starter: 9, Participant: new Participant('Richard', 'Hoang'), Time: new Time, Race: new Race()}];


  // For cleaning up in onDestroy()
  startSubscription: Subscription;
  stopSubscription: Subscription;

  constructor(private viewer: ViewerService) { }

  ngOnInit() {
    this.viewer.connect(); // Connect on website visit

    // Check for the start of a race
    this.startSubscription = this.viewer.start.subscribe(ms => {
      this.participantList = ms.Runners
    });

    // Check for the end of a race
    this.stopSubscription = this.viewer.stop.subscribe(endTime => {
    });
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.startSubscription.unsubscribe();
    this.stopSubscription.unsubscribe();

    this.viewer.disconnect();
  }

}
