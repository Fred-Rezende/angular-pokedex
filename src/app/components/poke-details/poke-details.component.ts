import { Component, HostListener, Input, SimpleChanges } from '@angular/core';
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
  // evolutions: EvolutionChainData[] = [];
  evolutions: any[] = [];
  evolutionChainURL: string = '';
  type: TypeData = new TypeData;
  totalStats: number = 0;
  currentMovePage: number = 0;
  movesPerPage: number = 10;
  displayedMoves: any[] = [];
  

  @Input()
  index: string = '';

  constructor(private service: PokemonService) { }

  // ngOnInit(): void {
  //   this.getPokemon(this.index);
  // }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['index'] && changes['index'].currentValue) {
      this.getPokemon(this.index);
    }
  }

  getPokemon(searchName: string) {
    this.service.getPokemon(searchName).subscribe({
      next: (res) => {
        this.pokemon = Object.assign(new PokemonData(), res);
        this.pokemon.height = parseFloat((this.pokemon.height * 0.10).toFixed(1));
        this.pokemon.weight = parseFloat((this.pokemon.weight * 0.10).toFixed(1));
        this.getType(this.getTypeNames());
        this.getSpecies();
        this.getMovesDetails();
        this.calculateTotalStats();
      },
      error: (err) => console.error('Pokemon not found:', err),
    });
  }

  calculateTotalStats(): void {
    this.totalStats = 0;
    this.pokemon.stats.forEach(stat => {
      this.totalStats = this.totalStats + stat.base_stat;
    });
  }

  getSpecies() {
    if (this.pokemon.species) {
      this.service
        .getSpecies(this.pokemon.species.name)
        .pipe(
          switchMap((data: any) => {
            return this.service.getEvolutionChain(data.evolution_chain.url);
          })
        )
        .subscribe({
          next: (data: any) => {
            this.evolutionChain = data.results;
            this.evolutions = (this.getEvolution(data.chain));
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
        moveDetails = moveDetails.map((move) => {
          if (!move.effect_entries || !move.effect_entries[0]){
            move.effect_entries = [
              {
                effect: 'No effect available',
                short_effect: 'No effect available'
              }
            ];
          }
          return move;
        });
        const typeRequests = moveDetails.map((move) =>
          this.service.getType(move.type.name)
        );
  
        forkJoin(typeRequests).subscribe({
          next: (typeDetails) => {
            this.pokemon.moves = this.pokemon.moves.map((m, index) => ({
              ...m,
              details: {
                ...Object.assign(new MoveData(), moveDetails[index]),
                type: {
                  ...moveDetails[index].type,
                  typeImage: Object.assign(new TypeData(), typeDetails[index]),
                },
              },
            }));
  
            // ✅ Garante que o carregamento ocorra apenas após todos os detalhes estarem disponíveis
            this.currentMovePage = 0; // Reinicia a página de moves
            this.displayedMoves = []; // Limpa os moves exibidos anteriormente
            this.loadMoreMoves();     // Agora carrega corretamente os primeiros 10 moves
          },
          error: (err) => console.error('Erro ao buscar detalhes dos tipos:', err),
        });
      },
      error: (err) => console.error('Erro ao buscar detalhes dos moves:', err),
    });
  }


  loadMoreMoves() {
    const startIndex = this.currentMovePage * this.movesPerPage;
    const endIndex = startIndex + this.movesPerPage;
  
    const nextMoves = this.pokemon.moves.slice(startIndex, endIndex);
    this.displayedMoves = [...this.displayedMoves, ...nextMoves];
  
    this.currentMovePage++;
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
     if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50) {
      // Se o usuário estiver próximo ao final da página, carrega mais moves
      if (this.displayedMoves.length < this.pokemon.moves.length) {
        this.loadMoreMoves();
      }
    }
  }


  // getEvolution(evolution: EvolutionChainData): EvolutionChainData[] {
  //   const evolutions: EvolutionChainData[] = [];

  //   if (evolution && evolution.species?.name) {
  //     evolutions.push(evolution);

  //   }

  //   if (Array.isArray(evolution.evolves_to) && evolution.evolves_to.length > 0) {
  //     evolution.evolves_to.forEach((evo) => {
  //       evolutions.push(...this.getEvolution(evo));
  //     });
  //   }


  //   return evolutions;
  // }

  // getEvolution(evolution: EvolutionChainData): any[] {
  //   const evolutions: any[] = [];

  //   if (evolution && evolution.species?.name) {
  //     evolutions.push({
  //       ...evolution,
  //       details: Array.isArray(evolution.evolution_details)
  //         ? this.parseEvolutionDetails(evolution.evolution_details)
  //         : this.parseEvolutionDetails([evolution.evolution_details]) // Garante que seja um array
  //     });
  //   }

  //   if (Array.isArray(evolution.evolves_to) && evolution.evolves_to.length > 0) {
  //     evolution.evolves_to.forEach((evo) => {
  //       evolutions.push(...this.getEvolution(evo));
  //     });
  //   }

  //   console.log (evolutions)
  //   return evolutions;
  // }

  getEvolution(evolution: EvolutionChainData, stage: number = 0, parent?: any): any[] {
    const evolutions: any[] = [];
  
    if (evolution && evolution.species?.name) {
      const evoData = {
        species: evolution.species,
        details: Array.isArray(evolution.evolution_details)
          ? this.parseEvolutionDetails(evolution.evolution_details)
          : this.parseEvolutionDetails([evolution.evolution_details]),
        stage,
        parent
      };
      evolutions.push(evoData);
    }
  
    if (Array.isArray(evolution.evolves_to) && evolution.evolves_to.length > 0) {
      evolution.evolves_to.forEach((evo) => {
        evolutions.push(...this.getEvolution(evo, stage + 1, evolution.species.name));
      });
    }
  
    return evolutions;
  }

  parseEvolutionDetails(details: any[]): any[] {
    return details.map(detail => ({
      min_level: detail.min_level || null,
      item: detail.item ? { name: detail.item.name, url: detail.item.url } : null,
      trigger: detail.trigger ? { name: detail.trigger.name, url: detail.trigger.url } : null,
      happiness: detail.min_happiness || null,
      affection: detail.min_affection || null,
      time_of_day: detail.time_of_day || null,
      known_move: detail.known_move ? detail.known_move.name : null,
      known_move_type: detail.known_move_type ? detail.known_move_type.name : null,
      held_item: detail.held_item ? detail.held_item.name : null
    }));
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

  groupLearnMethods(details: any[]): { method: string; details: any[] }[] {
    const grouped = details.reduce((acc, detail) => {

      let method = '';
      if (detail.move_learn_method.name == "machine") {
        method = "TM/HM";
      } else {
        method = detail.move_learn_method.name;
      }
      if (!acc[method]) {
        acc[method] = [];
      }
      acc[method].push(detail);
      return acc;
    }, {} as { [method: string]: any[] });

    return Object.keys(grouped).map((method) => ({
      method,
      details: grouped[method],
    }));
  }

  getGameClass(versionName: string): string {
    return versionName;
  }
}



