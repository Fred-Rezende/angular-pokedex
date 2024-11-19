import { Component } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-moves',
  templateUrl: './moves.component.html',
  styleUrl: './moves.component.css'
})
export class MovesComponent {

  title = 'pokedex';
  allmoves: number[] = Array.from({ length: 937 }, (_, i) => i + 1);
  moves: number[] = this.allmoves
  // displayedPokemons: number[] = [];
  // pokemonsPerPage: number = 12;
  // currentPage: number = 0;
  searchTerm: string = '';


  constructor(public pokemonService: PokemonService) {
    // this.loadMoreImages();
  }

  ngOnInit(): void {
    this.pokemonService.resetPages();
    this.pokemonService.loadMore(this.moves);
    
  }

  onSearch(): void {
    this.pokemonService.search(this.searchTerm, this.moves, 2);
  }

}
