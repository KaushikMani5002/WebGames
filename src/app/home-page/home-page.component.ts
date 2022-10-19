import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  // Variables
  currentGame: number;

  constructor() { 
    this.currentGame = 0;
  }

  ngOnInit() {
  }

  changegame($event){
    this.currentGame = $event;
  }

}
