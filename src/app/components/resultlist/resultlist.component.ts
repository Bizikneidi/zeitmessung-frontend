import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-resultlist',
  templateUrl: './resultlist.component.html',
  styleUrls: ['./resultlist.component.css']
})
export class ResultlistComponent implements OnInit {

  runners = [1, 2, 3];

  constructor() { }

  ngOnInit() {
  }

}
