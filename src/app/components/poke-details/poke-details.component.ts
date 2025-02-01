import { Component, HostListener, Input } from '@angular/core';
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
  type: TypeData = new TypeData;

  currentMovePage: number = 0;
movesPerPage: number = 10;
displayedMoves: any[] = [];

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

  // getMovesDetails() {
  //   const moveRequests = this.pokemon.moves.map((m) =>
  //     this.service.getMove(m.move.name)
  //   );
  
  //   forkJoin(moveRequests).subscribe({
  //     next: (moveDetails) => {
  //       const typeRequests = moveDetails.map((move) =>
  //         this.service.getType(move.type.name) // Busca os dados do tipo
  //       );
  
  //       forkJoin(typeRequests).subscribe({
  //         next: (typeDetails) => {
  //           // Associa os dados do move e do tipo
  //           this.pokemon.moves = this.pokemon.moves.map((m, index) => ({
  //             ...m,
  //             details: {
  //               ...Object.assign(new MoveData(), moveDetails[index]),
  //               type: {
  //                 ...moveDetails[index].type,
  //                 typeImage: Object.assign(new TypeData(), typeDetails[index]),
  //               },
  //             },
  //           }));
  //           console.log('Detalhes dos Moves com Tipo:', this.pokemon.moves); // Verificar no console
  //         },
  //         error: (err) =>
  //           console.error('Erro ao buscar detalhes dos tipos:', err),
  //       });
  //     },
  //     error: (err) => console.error('Erro ao buscar detalhes dos moves:', err),
  //   });
  // }

  getMovesDetails() {
    const moveRequests = this.pokemon.moves.map((m) =>
      this.service.getMove(m.move.name)
    );
  
    forkJoin(moveRequests).subscribe({
      next: (moveDetails) => {
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
  
            this.loadMoreMoves(); // Carregar os primeiros 10 moves
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
  
    this.currentMovePage++; // Avança para a próxima página
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
  
  groupLearnMethods(details: any[]): { method: string; details: any[] }[] {
    const grouped = details.reduce((acc, detail) => {
      const method = detail.move_learn_method.name;
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

}

  
  
