import { Component, Input, input } from '@angular/core';
import { PokemonData } from '../../models/pokemonData';
import { PokemonService } from '../../services/pokemon.service';
import { TypeData } from '../../models/typeData';

@Component({
  selector: 'app-poke-card',
  templateUrl: './poke-card.component.html',
  styleUrl: './poke-card.component.css'
})
export class PokeCardComponent {

  pokemon: PokemonData
  types: TypeData[] = [];


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

  @Input()
  index: string = ''

  ngOnInit(): void {
    this.getPokemon(this.index)
  }

  getPokemon(searchName: string) {
    this.service.getPokemon(searchName).subscribe(
      {
        next: (res) => {
          this.pokemon = {
            id: res.id,
            species: res.species,
            sprites: res.sprites,
            types: res.types
          }
          this.getType(this.getTypeNames()); // Chama getType com os nomes dos tipos
        },
        error: (err) => console.log('not found')
      }
    )
  }

  getType(searchNames: string[]) {
    // Inicializa ou limpa a lista de tipos
    this.types = [];

    searchNames.forEach((searchName) => {
      this.service.getType(searchName).subscribe(
        {
          next: (res) => {
            const type: TypeData = {
              id: res.id,
              name: res.name,
              sprites: res.sprites
            };
            this.types.push(type); // Adiciona cada tipo encontrado à lista
          },
          error: (err) => console.log(`${searchName} type not found`)
        }
      );
    });
  }

  getTypeNames(): string[] {
    return this.pokemon.types.map(t => t.type.name);
  }

}