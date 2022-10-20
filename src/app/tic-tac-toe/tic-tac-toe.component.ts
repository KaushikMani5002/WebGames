import { Component, OnInit, Output, EventEmitter } from '@angular/core';

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
  draw: string;
  current_turn: string;
  red_selected: any[];
  green_selected: any[];
  two_player: boolean = true;
  current_player: string;
  show: boolean = false;
  p1_score: number;
  p2_score: number;
  @Output() home = new EventEmitter<number>();
  constructor() {
    localStorage.clear();
    localStorage.setItem('p1_score', '0');
    localStorage.setItem('p2_score','0');
    this.p1_score = 0;
    this.p2_score = 0;
   }

  ngOnInit() {
    this.availableTiles = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    this.red_url = 'assets/images/close.png';
    this.green_url = 'assets/images/virus.png';
    this.red_avatar = 'assets/images/player1.svg';
    this.green_avatar = 'assets/images/player2.svg';
    this.draw = 'assets/images/draw.svg';
    this.current_turn = 'green';
    this.red_selected = [];
    this.green_selected = [];
    this.current_player = 'user';
  }
  ngAfterViewInit(){
    document.getElementById('first-modal').click();
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
    const text = this.current_turn === 'green' ? 'O' : 'X';
    element.innerHTML = text;
    // const url = this.current_turn === 'green' ? this.green_url : this.red_url;
    // element.style.background = "url(" + url + ")";
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
    }else{
      if(this.availableTiles.length !== 0){
        if(this.two_player){
          this.current_player = this.current_player === 'user' ? 'bot' : 'user';
          if(this.current_player === 'bot'){
            this.pcAutoPlay();
          }
        }
      }
      else{
        this.current_turn = 'Nobody';
        document.getElementById('openmodal').click();
      }
    }
  }

  // Call ngOnInit() after modal closes
  callDelayedOnInit(){
    setTimeout(() => {
      this.ngOnInit();
    }, 100);
  }

  // Play Again
  playAgain(){
    const turn = this.current_turn;
    this.resetGame();
    this.callDelayedOnInit();
    this.incrementScore(turn);
  }

  incrementScore(turn: string){
    if(turn === 'red' || turn === 'green'){
      const lsVar = turn === 'red' ? 'p1_score' : 'p2_score';
      const val = parseInt(localStorage.getItem(lsVar));
      localStorage.setItem(lsVar, (val+1).toString());
      this.getScores();
    }
  }

  getScores(){
    this.p1_score = parseInt(localStorage.getItem('p1_score'));
    this.p2_score = parseInt(localStorage.getItem('p2_score'));
  }

  resetScores(){
    localStorage.setItem('p1_score', '0');
    localStorage.setItem('p2_score', '0');
  }
  
  resetGame(){
    // Reset Game
    for(let i = 1; i < 10; i++){
      const element = document.getElementById('tile-'+i);
      element.innerHTML = null;
    }
  }

  // PC's Turn
  pcAutoPlay(){
    const pc_value = Math.floor(Math.random() * this.availableTiles.length);
    this.checkMarked(this.availableTiles[pc_value]);
  }

  // Game Mode (Single player or Multiplayer)
  gameMode(value){
    this.two_player = value === 1 ? true : false;
    this.show = true;
    this.resetScores();
    this.getScores();
  }
  changeGame(){
    document.getElementById('closemodal').click();
    document.getElementById('first-modal').click();
    this.resetGame();
    this.callDelayedOnInit();
  }

  ngOnDestroy(){
    localStorage.clear();
  }
}
