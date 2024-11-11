import { Component, ViewChild } from '@angular/core';
import { PokemonService } from './services/pokemon.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})


export class AppComponent {
  title = 'pokedex';
  allPokemons: number[] = Array.from({ length: 1025 }, (_, i) => i + 1);
  pokemons: number[] = this.allPokemons
  displayedPokemons: number[] = [];
  pokemonsPerPage: number = 12;
  currentPage: number = 0;
  searchTerm: string = '';


  constructor(private pokemonService: PokemonService) {
    // this.loadMoreImages();
  }

  ngOnInit(): void {
    this.loadMorePokemons();
  }

  get hasMorePokemons(): boolean {
    return this.currentPage * this.pokemonsPerPage < this.pokemons.length;
  }

  loadMorePokemons(): void {
    const nextPagePokemons = this.pokemons.slice(
      this.currentPage * this.pokemonsPerPage,
      (this.currentPage + 1) * this.pokemonsPerPage
    );
    this.displayedPokemons = [...this.displayedPokemons, ...nextPagePokemons];
    this.currentPage++;
  }

  searchPokemon() {
    if (this.searchTerm) {
      this.pokemonService.getPokemon(this.searchTerm.toLowerCase()).subscribe((pokemon) => {
        console.log('Pokémon encontrado:', pokemon); // Logando o Pokémon encontrado
        this.pokemons = [pokemon.id]; // Exibe o Pokémon buscado
        this.displayedPokemons = [];
        this.currentPage = 0;
        this.loadMorePokemons();
      });
    } else {
      this.pokemons = this.allPokemons
      this.displayedPokemons = []; // Limpa as imagens exibidas
      this.currentPage = 0; // Reinicia a contagem de páginas
      this.loadMorePokemons();; // Se não houver busca, carrega todos os Pokémons
    }
  }

  // resetLoadPokemon(): void {
  //   this.numbers = this.allnumbers// Restaura todos os números
  //   this.displayedImages = []; // Limpa as imagens exibidas
  //   this.currentPage = 0; // Reinicia a contagem de páginas
  //   this.loadMoreImages(); // Carrega as primeiras imagens novamente
  // }
}