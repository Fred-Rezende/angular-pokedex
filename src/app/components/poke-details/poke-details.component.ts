import { Component, Input } from '@angular/core';
import { PokemonData } from '../../models/pokemonData';
import { TypeData } from '../../models/typeData';
import { PokemonService } from '../../services/pokemon.service';
import { EvolutionChainData } from '../../models/evolutionChainData';
import { forkJoin, switchMap } from 'rxjs';
import { MoveData } from '../../models/moveData';

@Component({
  selector: 'app-poke-details',
  templateUrl: './poke-details.component.html',
  styleUrl: './poke-details.component.css'
})
export class PokeDetailsComponent {
  pokemon: PokemonData = new PokemonData();
  types: TypeData[] = [];
  evolutionChain: EvolutionChainData = new EvolutionChainData();
  evolutions: EvolutionChainData[] = [];
  evolutionChainURL: string = '';

  @Input()
  index: string = '';

  constructor(private service: PokemonService) {}

  ngOnInit(): void {
    this.getPokemon(this.index);
  }

  getPokemon(searchName: string) {
    this.service.getPokemon(searchName).subscribe({
      next: (res) => {
        this.pokemon = Object.assign(new PokemonData(), res);
        console.log('Dados do Pokémon:', this.pokemon); // Log para verificar os dados do Pokémon
        this.getType(this.getTypeNames());
        this.getSpecies();
        this.getMovesDetails(); // Buscar detalhes dos movimentos
      },
      error: (err) => console.error('Pokemon not found:', err),
    });
  }

  getSpecies() {
    if (this.pokemon.species) {
      this.service
        .getSpecies(this.pokemon.species.name)
        .pipe(
          switchMap((data: any) =>{
            console.log('Dados da espécie:', data); // Log para verificar os dados da espécie
            return this.service.getEvolutionChain(data.evolution_chain.url);
          })
        )
        .subscribe({
          next: (data: any) => {
            this.evolutionChain = data.results;
            console.log('Cadeia de Evolução:', this.evolutionChain); // Log para verificar a cadeia de evolução
            this.evolutions = (this.getEvolution(data.chain));
            console.log('Cadeia de Evolução:', this.evolutions);
          },
          error: (err) => console.error('Error fetching species or chain:', err),
        });
    }
  }

  getMovesDetails() {
    const moveRequests = this.pokemon.moves.map((m) =>
      this.service.getMove(m.move.name)
    );
  
    forkJoin(moveRequests).subscribe({
      next: (moveDetails) => {
        // Atualiza cada move com os detalhes retornados
        this.pokemon.moves = this.pokemon.moves.map((m, index) => ({
          ...m,
          details: Object.assign(new MoveData(), moveDetails[index]) // Preenche o objeto MoveData
        }));
        console.log('Detalhes dos Moves:', this.pokemon.moves); // Verificar no console
      },
      error: (err) => console.error('Erro ao buscar detalhes dos moves:', err),
    });
  }

  getEvolution(evolution: EvolutionChainData): EvolutionChainData[] {
    const evolutions: EvolutionChainData[] = [];

    if (evolution && evolution.species?.name) {
      evolutions.push(evolution);
      console.log('Adicionando evolução:', evolution); // Log para cada evolução adicionada
    }

    if (Array.isArray(evolution.evolves_to) && evolution.evolves_to.length > 0) {
      evolution.evolves_to.forEach((evo) => {
        evolutions.push(...this.getEvolution(evo)); // Recursão
      });
    }

    // this.evolutions = evolutions;
    return evolutions;
  }

  getType(searchNames: string[]) {
    const typeRequests = searchNames.map((name) =>
      this.service.getType(name)
    );

    forkJoin(typeRequests).subscribe({
      next: (results) => {
        this.types = results.map((res) => Object.assign(new TypeData(), res));
      },
      error: (err) => console.error('Error fetching types:', err),
    });
   
  }

  getTypeNames(): string[] {
    return this.pokemon.types.map((t) => t.type.name);
  }

  getPokemonIdFromUrl(url: string): string {
    const parts = url.split('/');
    return parts[parts.length - 2]; // Obtém o penúltimo segmento da URL
  }
}

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
  
