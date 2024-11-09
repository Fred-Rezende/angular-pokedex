import { Component } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { PokemonData } from '../../models/pokemonData';
import { TypeData } from '../../models/typeData';
import { PokemonList } from '../../models/pokemonList';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  pokemon:PokemonData
  pokemonDetailsList: Array<{ details: PokemonData; types: TypeData[] }> = [];
  types:TypeData[] = [];
  pokemonList: PokemonList | null = null;
 
  constructor(
    private service:PokemonService
  ){
    this.pokemon = {
      id:0,
      species:{ name: ''},
      sprites:{
        front_default: '',
        other: {
          "official-artwork":{
            front_default: '',
          }
        }

        }
      ,types:[]
    }
  }

  ngOnInit(): void {
     this.loadPokemonList();
    }

   loadPokemonList(): void {
    this.service.getPokemonList().subscribe({
      next: (res) => {
        // Para cada Pokémon na lista, busca os detalhes e adiciona à lista
        res.results.forEach((pokemon) => {
          this.getPokemonDetails(pokemon.name);
        });
      },
      error: (err) => console.log('Error fetching Pokemon list')
    });
  }

  // Obtém os detalhes de um Pokémon pelo nome e adiciona à lista de detalhes
  getPokemonDetails(pokemonName: string): void {
    this.service.getPokemon(pokemonName).subscribe({
      next: (res) => {
        const types: TypeData[] = [];

        // Para cada tipo de Pokémon, busca o tipo completo e adiciona à lista `types`
        res.types.forEach((typeObj) => {
          this.service.getType(typeObj.type.name).subscribe({
            next: (typeData) => {
              types.push(typeData);

              // Adiciona o Pokémon à lista quando todos os tipos forem buscados
              if (types.length === res.types.length) {
                this.pokemonDetailsList.push({ details: res, types });
              }
            },
            error: (err) => console.log(`Type ${typeObj.type.name} not found`)
          });
        });
      },
      error: (err) => console.log(`Pokemon ${pokemonName} not found`)
    });
  }

  getPokemon(searchName:string){
    this.service.getPokemon(searchName).subscribe(
      {
        next: (res) => {

          this.pokemon = {
            id: res.id,
            species: res.species,
            sprites: res.sprites,
            types: res.types
          }
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