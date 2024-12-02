import { Component } from '@angular/core';

@Component({
  selector: 'app-catchgame',
  templateUrl: './catchgame.component.html',
  styleUrl: './catchgame.component.css'
})
export class CatchgameComponent {
  rows = [
    [{ id: 1 }, { id: 2 }, { id: 3 }],
    [{ id: 4 }, { id: 5 }, { id: 6 }],
    [{ id: 7 }, { id: 8 }, { id: 9 }],
  ];

 
  timer: number = 60; 
  timerInterval: any; 
  gameOver: boolean = false;
  isPlaying: boolean = false;
  score = 0;
  hitPosition: number | null = null;
  gameInterval: any;
  countDownInterval: any;

  
  ngOnInit() {
    this.resetGame();
  }

  startGame() {
    this.isPlaying = true;
    this.startTimer();
    // this.gameInterval = setInterval(() => this.randomSquare(), 1000);
    // this.countDownInterval = setInterval(() => this.countDown(), 1000);
  }

  resetGame() {
    this.timer = 60; 
    this.gameOver = false;
    this.hitPosition = null;
    this.score = 0;
    clearInterval(this.gameInterval);
    clearInterval(this.timerInterval);
    this.isPlaying = false;
  }

  // countDown() {
  //   this.currentTime--;
  //   if (this.currentTime <= 0) {
  //     clearInterval(this.gameInterval);
  //     clearInterval(this.countDownInterval);
  //     // alert(`Game Over! O seu resultado foi: ${this.score}`);
  //   }
  // }

  startTimer() {
    this.gameInterval = setInterval(() => this.randomSquare(), 1000);
    this.timerInterval = setInterval(() => {
      this.timer--;

      if (this.timer <= 0) {
        clearInterval(this.gameInterval);
        clearInterval(this.timerInterval); // Para o timer ao final
        this.gameOver = true
      }
    }, 1000);
  }

  randomSquare() {
    this.hitPosition = Math.floor(Math.random() * 9) + 1;
  }

  checkHit(squareId: number) {
    if (squareId === this.hitPosition) {
      this.score++;
      this.hitPosition = null;
      this.playSound('hit');
    }
  }

  playSound(audioName: string) {
    const audio = new Audio(`../../../assets/audios/${audioName}.m4a`);
    audio.volume = 0.2;
    audio.play();
  }
}