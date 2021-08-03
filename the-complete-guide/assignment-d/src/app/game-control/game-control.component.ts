import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-game-control',
  templateUrl: './game-control.component.html',
  styleUrls: ['./game-control.component.css']
})
export class GameControlComponent implements OnInit {

  counter: number = 0;
  @Output() counterUpdated = new EventEmitter<number>();
  gameCycle: any;

  constructor() { }

  ngOnInit(): void {

  }

  onGameStart() {
    this.gameCycle = setInterval(() => {
      this.counter++;
      this.counterUpdated.emit(this.counter);
    }, 1000);
  }

  onGameStop() {
    clearInterval(this.gameCycle);
  }

}
