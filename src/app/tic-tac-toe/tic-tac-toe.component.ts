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
  red_avatar: string;
  green_avatar: string;
  current_turn: string;
  red_selected: any[];
  green_selected: any[];
  play_with_pc: boolean = true;
  constructor() { }

  ngOnInit() {
    this.availableTiles = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    this.red_url = 'assets/images/close.png';
    this.green_url = 'assets/images/virus.png';
    this.red_avatar = 'assets/images/red-avatar.png';
    this.green_avatar = 'assets/images/green-avatar.png';
    this.current_turn = 'green';
    this.red_selected = [];
    this.green_selected = [];
  }

  // Check Marked
  checkMarked(value: number){
    const remove = this.availableTiles.findIndex((number)=>{
      return number === value;
    });
    if(remove !== -1){
      this.current_turn = this.current_turn === 'green' ? 'red' : 'green';
      this.current_turn === 'red' ? (this.red_selected.push(value)) : (this.green_selected.push(value));
      this.availableTiles.splice(remove, 1);
      this.markTile(value - 1);
      // if(this.play_with_pc){
      //   this.pcAutoPlay();
      // }
    }
  }

  // Mark Tile
  markTile(id: any){
      this.addBackground(id+1);
      this.checkWin(this.current_turn);
  }

  // Add Image
  addBackground(id) {
    // console.log("addBackground");
    const element = document.getElementById('tile-' + id);
    const url = this.current_turn === 'green' ? this.green_url : this.red_url;
    element.style.background = "url(" + url + ")";
  }

  //Win Condition
  checkWin(turn: string){
    // console.log("checkWin");
    const arr = turn === 'red' ? this.red_selected : this.green_selected;
    let condition1 = arr.includes(1) && arr.includes(2) && arr.includes(3);
    let condition2 = arr.includes(1) && arr.includes(4) && arr.includes(7);
    let condition3 = arr.includes(1) && arr.includes(5) && arr.includes(9);
    let condition4 = arr.includes(3) && arr.includes(6) && arr.includes(9);
    let condition5 = arr.includes(7) && arr.includes(8) && arr.includes(9);
    let condition6 = arr.includes(3) && arr.includes(5) && arr.includes(7);
    let condition7 = arr.includes(2) && arr.includes(5) && arr.includes(8);
    let condition8 = arr.includes(4) && arr.includes(5) && arr.includes(6);
    let win = condition1 || condition2 || condition3 || condition4 || condition5 || condition6 || condition7 || condition8;
    if(win){
      const element = document.getElementById("openmodal");
      element.click(); 
    }
  }

  // Play Again
  playAgain(){
    // Reset Game
    for(let i = 1; i < 10; i++){
      const element = document.getElementById('tile-'+i);
      element.style.background = 'none';
    }
    this.ngOnInit();
  }

  // PC's Turn
  pcAutoPlay(){
  }
}
