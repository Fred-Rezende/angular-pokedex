import { Component, Input } from '@angular/core';
import { PokemonData } from '../../models/pokemonData';

@Component({
  selector: 'app-cardsgame-frontcard',
  templateUrl: './cardsgame-frontcard.component.html',
  styleUrl: './cardsgame-frontcard.component.css'
})
export class CardsgameFrontcardComponent {

  @Input()
  infoCard: PokemonData = new PokemonData;

  getStatName(statName: string): string {
    const statNames: { [key: string]: string } = {
      hp: 'HP: ',
      attack: 'AT: ',
      defense: 'DF: ',
      ['special-attack']: 'SA: ',
      ['special-defense']: 'SD: ',
      speed: 'SP: ',
    };
    return statNames[statName];
  }
  
}