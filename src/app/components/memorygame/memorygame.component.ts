import { Component, OnInit } from '@angular/core';
import { PokemonData } from '../../models/pokemonData';
import { PokemonService } from '../../services/pokemon.service';

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
  // emojis: string[] = [
  //   "🍕", "🍕", "🍔", "🍔", "🌭", "🌭", "🍗", "🍗", 
  //   "🍩", "🍩", "🍰", "🍰", "🍟", "🍟", "🥪", "🥪"
  // ];

  pokemon: PokemonData;
  emojis: string[] = [];
  shuffledEmojis: Card[] = [];
  openCards: Card[] = [];

  constructor(private service: PokemonService) {
    this.pokemon = {
      id: 0,
      species: { name: '' },
      sprites: {
        front_default: '',
        other: {
          "official-artwork": {
            front_default: '',
          }
        }
      }
      , types: []
    }
  }

  ngOnInit() {
    this.resetGame();
  }


  gerarPokemonsAleatorios() {
    const numerosAleatorios: number[] = [];

    while (numerosAleatorios.length < 8) {
      const numero = Math.floor(Math.random() * 1025) + 1; // Gera número entre 1 e 1025
      if (!numerosAleatorios.includes(numero)) { // Verifica se o número já foi gerado
        numerosAleatorios.push(numero);
        this.getPokemon(numero.toString())
      }
    }
  }

  getPokemon(searchName: string) {
    this.service.getPokemon(searchName).subscribe(
      {
        next: (res) => {
          this.pokemon = ({
            id: res.id,
            species: res.species,
            sprites: res.sprites,
            types: res.types
          })
          this.emojis.push(res.sprites.front_default, res.sprites.front_default);

          this.shuffledEmojis = this.shuffleCards();
        },
        error: (err) => console.log('not found')
      }
    )
  }

  resetGame() {
    // this.openCards = [];
    // this.shuffledEmojis = this.shuffleCards();

    this.openCards = [];
    this.emojis = [];
    this.shuffledEmojis = [];
    this.gerarPokemonsAleatorios()
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
