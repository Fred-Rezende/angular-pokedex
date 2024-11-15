import { Component} from '@angular/core';
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
  displayedPokemons: number[] = [];
  pokemonsPerPage: number = 12;
  currentPage: number = 0;
  searchTerm: string = '';


  constructor(public pokemonService: PokemonService) {
    // this.loadMoreImages();
  }

  ngOnInit(): void {
   this.pokemonService.loadMorePokemons(this.pokemons);
  }

  onSearch(): void {
    this.pokemonService.searchPokemon(this.searchTerm,this.pokemons);
  }

  // hasMorePokemons(poke:number[] ): boolean {
  //   return this.currentPage * this.pokemonsPerPage < poke.length;
  // }

  // loadMorePokemons(poke:number[] ): number[] {
  //   let displayed: number[]=[]
  //   const nextPagePokemons = poke.slice(
  //     this.currentPage * this.pokemonsPerPage,
  //     (this.currentPage + 1) * this.pokemonsPerPage
  //   );
  //   displayed = [...displayed, ...nextPagePokemons];
  //   this.currentPage++;
  //   return displayed
  // }

  // searchPokemon() {
  //   if (this.searchTerm) {
  //     this.pokemonService.getPokemon(this.searchTerm.toLowerCase()).subscribe((pokemon) => {
  //       console.log('Pokémon encontrado:', pokemon); // Logando o Pokémon encontrado
  //       this.pokemons = [pokemon.id]; // Exibe o Pokémon buscado
  //       this.displayedPokemons = [];
  //       this.currentPage = 0;
  //       this.pokemonService.loadMorePokemons(this.pokemons);
  //     });
  //   } else {
  //     this.pokemons = this.allPokemons
  //     this.displayedPokemons = []; // Limpa as imagens exibidas
  //     this.currentPage = 0; // Reinicia a contagem de páginas
  //     this.pokemonService.loadMorePokemons(this.pokemons);; // Se não houver busca, carrega todos os Pokémons
  //   }
  // }

  // resetLoadPokemon(): void {
  //   this.numbers = this.allnumbers// Restaura todos os números
  //   this.displayedImages = []; // Limpa as imagens exibidas
  //   this.currentPage = 0; // Reinicia a contagem de páginas
  //   this.loadMoreImages(); // Carrega as primeiras imagens novamente
  // }
}