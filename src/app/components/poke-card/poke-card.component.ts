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

  pokemon: PokemonData = new PokemonData(); // Usa a classe para inicializar
  types: TypeData[] = [];
  
  @Input()
  index: string = '';
  
  constructor(private service: PokemonService) {}
  
  ngOnInit(): void {
    this.getPokemon(this.index);
  }
  
  getPokemon(searchName: string) {
    this.service.getPokemon(searchName).subscribe({
      next: (res) => {
        this.pokemon = Object.assign(new PokemonData(), res); // Atribui e mantém o tipo da classe
        this.getType(this.getTypeNames()); // Chama getType com os nomes dos tipos
      },
      error: (err) => console.log('not found'),
    });
    
  }
  
  getType(searchNames: string[]) {
    this.types = []; // Inicializa ou limpa a lista de tipos
  
    searchNames.forEach((searchName) => {
      this.service.getType(searchName).subscribe({
        next: (res) => {
          const type = Object.assign(new TypeData(), res); // Mapeia os dados para a classe TypeData
            this.types.push(type); // Adiciona cada tipo encontrado à lista
        },
        error: (err) => console.log(`${searchName} type not found`),
      });
    });
  }
  
  getTypeNames(): string[] {
    return this.pokemon.types.map((t) => t.type.name);
  }
  }