import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tic-tac-toe',
  templateUrl: './tic-tac-toe.component.html',
  styleUrls: ['./tic-tac-toe.component.scss']
})
export class TicTacToeComponent implements OnInit {
  // Variables
  availableTiles: any[];
  red_url: string;
  green_url: string;
  current_turn: string;
  constructor() { }

  ngOnInit() {
    this.availableTiles = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    this.red_url = 'assets/images/close.png';
    this.green_url = 'assets/images/virus.png';
    this.current_turn = 'green';
  }

  // Check Win Condition
  checkWin(value: number){
    const remove = this.availableTiles.findIndex((number)=>{
      return number === value;
    });
    if(remove !== -1){
      this.markTile(remove);
    }
  }

  // mark tile
  markTile(id: any){
      this.availableTiles[id] = 0;
      this.current_turn = this.current_turn === 'green' ? 'red' : 'green';
      this.addBackground(id+1);
  }

  // Add Image
  addBackground(id) {
    const element = document.getElementById('tile-' + id);
    const url = this.current_turn === 'green' ? this.green_url : this.red_url;
    element.style.background = "url(" + url + ")";
    element.style.backgroundRepeat = 'no-repeat';
    element.style.backgroundPosition = 'center';
  }
}
