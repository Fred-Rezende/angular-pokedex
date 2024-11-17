import { Component } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-itens',
  templateUrl: './itens.component.html',
  styleUrl: './itens.component.css'
})
export class ItensComponent {
  title = 'pokedex';
  allitens: number[] = Array.from({ length: 2180 }, (_, i) => i + 1);
  itens: number[] = this.allitens
  displayedPokemons: number[] = [];
  pokemonsPerPage: number = 12;
  currentPage: number = 0;
  searchTerm: string = '';


  constructor(public pokemonService: PokemonService) {
    // this.loadMoreImages();
  }

  ngOnInit(): void {
    this.pokemonService.resetPages();
    this.pokemonService.loadMore(this.itens);
  }

  onSearch(): void {
    this.pokemonService.search(this.searchTerm, this.itens, 2);
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
