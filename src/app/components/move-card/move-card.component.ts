import { Component, Input } from '@angular/core';
import { MoveData } from '../../models/moveData';
import { PokemonService } from '../../services/pokemon.service';
import { TypeData } from '../../models/typeData';

@Component({
  selector: 'app-move-card',
  templateUrl: './move-card.component.html',
  styleUrl: './move-card.component.css'
})
export class MoveCardComponent {
  move: MoveData;
  type: TypeData;


  constructor(private service: PokemonService) {
    this.move = {
      id: 0,
      name: '',
      power: 0,
      accuracy: 0,
      pp: 0,
      effect_entries: {
        0: {
          effect: '',
          short_effect: ''
        }
      },
      type: {
        name: '',
        url: ''
      }
    }

    this.type = {
      id: 0,
      name: '',
      sprites: {
        'generation-viii': {
          'sword-shield': { name_icon: '' }
        }
      }
    };
  }


  @Input()
  index: string = ''

  ngOnInit(): void {
    this.getMove(this.index)
  }

  getMove(searchName: string) {
    this.service.getMove(searchName).subscribe(
      {
        next: (res) => {
          this.move = {
            id: res.id,
            name: res.name,
            power: res.power,
            accuracy: res.accuracy,
            pp: res.pp,
            effect_entries: res.effect_entries[0] ? res.effect_entries : [{ effect: 'No effect available', short_effect: 'No effect available' }],
            type: res.type
          }
          this.getType(this.getTypeName()); // Chama getType com os nomes dos tipos
        },
        error: (err) => console.log('not found')
      }
    )
  }

  getType(searchName: string): void {
    this.service.getType(searchName).subscribe({
      next: (res) => {
        this.type = {
          id: res.id,
          name: res.name,
          sprites: res.sprites
        };
      },
      error: (err) => console.error('Type not found', err)
    });
  }

  // Função que retorna o nome do tipo do movimento (apenas um tipo)
  getTypeName(): string {
    return this.move.type.name; // Retorna o nome do único tipo
  }

}

