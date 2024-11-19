import { Component, OnInit } from '@angular/core';

interface Card {
  emoji: string;
  open: boolean;
  matched: boolean;
}

@Component({
  selector: 'app-memorygame',
  templateUrl: './memorygame.component.html',
  styleUrls: ['./memorygame.component.css']
})
export class MemoryGameComponent implements OnInit {
  emojis: string[] = [
    "🍕", "🍕", "🍔", "🍔", "🌭", "🌭", "🍗", "🍗", 
    "🍩", "🍩", "🍰", "🍰", "🍟", "🍟", "🥪", "🥪"
  ];
  shuffledEmojis: Card[] = [];
  openCards: Card[] = [];

  ngOnInit() {
    this.resetGame();
  }

  resetGame() {
    this.openCards = [];
    this.shuffledEmojis = this.shuffleCards();
  }

  shuffleCards(): Card[] {
    // Embaralha os emojis
    const shuffled = [...this.emojis].sort(() => Math.random() > 0.5 ? 1 : -1);
    return shuffled.map(emoji => ({
      emoji,
      open: false,
      matched: false
    }));
  }

  handleClick(card: Card) {
    if (card.open || this.openCards.length === 2 || card.matched) {
      return;
    }

    card.open = true;
    this.openCards.push(card);

    if (this.openCards.length === 2) {
      setTimeout(() => this.checkMatch(), 500);
    }
  }

  checkMatch() {
    const [card1, card2] = this.openCards;

    if (card1.emoji === card2.emoji) {
      card1.matched = true;
      card2.matched = true;
    } else {
      card1.open = false;
      card2.open = false;
    }

    this.openCards = [];

    if (this.shuffledEmojis.every(card => card.matched)) {
      alert('Você venceu!');
    }
  }
}
