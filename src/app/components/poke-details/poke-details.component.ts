import { Component, Input } from '@angular/core';
import { PokemonData } from '../../models/pokemonData';
import { TypeData } from '../../models/typeData';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-poke-details',
  templateUrl: './poke-details.component.html',
  styleUrl: './poke-details.component.css'
})
export class PokeDetailsComponent {
  
  // pokemon: PokemonData = new PokemonData(); // Usa a classe para inicializar
  // types: TypeData[] = [];
  // evolutionChain: any[] = [];
  
  // @Input()
  // index: string = '';
  
  // constructor(private service: PokemonService) {}
  
  // ngOnInit(): void {
  //   this.getPokemon(this.index);
  // }
  
  
  // getPokemon(searchName: string) {
  //   this.service.getPokemon(searchName).subscribe({
  //     next: (res) => {
  //       this.pokemon = Object.assign(new PokemonData(), res);
  //       this.evolutionChain = this.mapEvolutionChain(res.evolutionChain); // Mapeia as evoluções
  //       this.getType(this.getTypeNames());
  //     },
  //     error: (err) => console.log('not found'),
  //   });
  // }
  
  // mapEvolutionChain(evolutionChain: any): any[] {
  //   const evolutions = [];
  //   let current = evolutionChain.chain;
  
  //   while (current) {
  //     evolutions.push({
  //       name: current.species.name,
  //       url: current.species.url,
  //     });
  //     current = current.evolves_to[0]; // Considera apenas a próxima evolução
  //   }
  
  //   // console.log(this.pokemon.evolvesFrom);
  //   // console.log(this.pokemon.evolutionChain);
  //   return evolutions;
  // }
  
  // getType(searchNames: string[]) {
  //   this.types = []; // Inicializa ou limpa a lista de tipos
  
  //   searchNames.forEach((searchName) => {
  //     this.service.getType(searchName).subscribe({
  //       next: (res) => {
  //         const type = Object.assign(new TypeData(), res); // Mapeia os dados para a classe TypeData
  //           this.types.push(type); // Adiciona cada tipo encontrado à lista
  //       },
  //       error: (err) => console.log(`${searchName} type not found`),
  //     });
  //   });
  // }
  
  // getTypeNames(): string[] {
  //   return this.pokemon.types.map((t) => t.type.name);
  // }
  }
