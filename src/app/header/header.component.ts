import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  // Variables
  // Event Emitters
  @Output() game = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }
  // Switch Game
  changeGame(id: number){
    this.game.emit(id);
  }

}
