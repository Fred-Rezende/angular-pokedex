import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-cardsgame',
  templateUrl: './cardsgame.component.html',
  styleUrl: './cardsgame.component.css'
})
export class CardsgameComponent implements OnInit {
  @ViewChild('bgm') bgmAudio!: ElementRef<HTMLAudioElement>;
  @ViewChild('nextDuelButton') nextDuelButton!: ElementRef<HTMLButtonElement>;

  // Dados do jogo
  playerCards: any[] = [];
  computerCards: any[] = [];
  cardData: any[] = [
    { id: 0, name: 'Blue Eyes White Dragon', type: 'Paper', img: 'assets/icons/dragon.png', winOf: [1], loseOf: [2] },
    { id: 1, name: 'Dark Magician', type: 'Rock', img: 'assets/icons/magician.png', winOf: [2], loseOf: [0] },
    { id: 2, name: 'Exodia', type: 'Scissors', img: 'assets/icons/exodia.png', winOf: [0], loseOf: [1] }
  ];
  playerFieldCard: any = null;
  computerFieldCard: any = null;
  score = { playerScore: 0, computerScore: 0 };
  duelResult: string = '';

  ngOnInit() {
    this.init();
  }

  /** Inicializa o jogo */
  init() {
    this.playerCards = this.generateRandomCards(5);
    this.computerCards = this.generateRandomCards(5);
    this.playBackgroundMusic();
  }

  /** Gera cartas aleatórias */
  generateRandomCards(count: number): any[] {
    const cards = [];
    for (let i = 0; i < count; i++) {
      cards.push(this.getRandomCard());
    }
    return cards;
  }

  /** Retorna uma carta aleatória */
  getRandomCard(): any {
    const randomIndex = Math.floor(Math.random() * this.cardData.length);
    return this.cardData[randomIndex];
  }

  /** Lógica ao selecionar uma carta */
  selectCard(card: any) {
    this.playerFieldCard = card;
    this.computerFieldCard = this.getRandomCard();
    this.duelResult = this.checkDuelResult(card, this.computerFieldCard);
    this.updateScore();
    this.drawButton(this.duelResult);
  }

  /** Atualiza o placar */
  updateScore() {
    if (this.duelResult === 'win') {
      this.score.playerScore++;
    } else if (this.duelResult === 'lose') {
      this.score.computerScore++;
    }
  }

  /** Exibe o botão de resultado */
  drawButton(result: string) {
    const button = this.nextDuelButton.nativeElement;
    button.style.display = 'block';
    button.textContent = result.toUpperCase();
  }

  /** Reseta o estado do duelo */
  resetDuel() {
    this.playerFieldCard = null;
    this.computerFieldCard = null;
    this.duelResult = '';

    // Oculta o botão
    const button = this.nextDuelButton.nativeElement;
    button.style.display = 'none';
    this.playerCards = this.generateRandomCards(5);
    this.computerCards = this.generateRandomCards(5);
  }

  /** Verifica o resultado do duelo */
  checkDuelResult(playerCard: any, computerCard: any): string {
    if (playerCard.winOf.includes(computerCard.id)) {
      this.playAudio('win');
      return 'win';
    } else if (playerCard.loseOf.includes(computerCard.id)) {
      this.playAudio('lose');
      return 'lose';
    } else {
      this.playAudio('draw');
      return 'draw';
    }
  }

  /** Reproduz o áudio correspondente */
  playAudio(status: string) {
    const audio = new Audio(`assets/audios/${status}.wav`);
    audio.play();
  }

  /** Reproduz a música de fundo */
  playBackgroundMusic() {
    if (this.bgmAudio) {
      this.bgmAudio.nativeElement.play();
    }
  }
}