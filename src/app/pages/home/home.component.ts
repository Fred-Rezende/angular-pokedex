import { Component } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  title = 'pokedex';
  allPokemons: number[] = Array.from({ length: 1025 }, (_, i) => i + 1);
  pokemons: number[] = this.allPokemons
  searchTerm: string = '';


  constructor(public pokemonService: PokemonService) {
    // this.loadMoreImages();
    this.pokemonService.resetPages();
  }

  ngOnInit(): void {
    this.pokemonService.loadMore(this.pokemons,'pokemon');
  }

  onSearch(): void {
    this.pokemonService.search(this.searchTerm, this.pokemons, 1);
  }

  
}