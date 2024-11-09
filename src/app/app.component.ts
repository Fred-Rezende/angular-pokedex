import { Component, ViewChild } from '@angular/core';
import { PokemonService } from './services/pokemon.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'pokedex';
  numbers: number[] = Array.from({ length: 1025 }, (_, i) => i + 1);
  displayedImages: number[] = [];
  imagesPerPage: number = 12;
  currentPage: number = 0;
  searchTerm: string = '';


  constructor(private pokemonService: PokemonService) {
    // this.loadMoreImages();
  }

  ngOnInit(): void {
    this.loadMoreImages();
  }

  get hasMoreImages(): boolean {
    return this.currentPage * this.imagesPerPage < this.numbers.length;
  }

  loadMoreImages(): void {
    const nextPageImages = this.numbers.slice(
      this.currentPage * this.imagesPerPage,
      (this.currentPage + 1) * this.imagesPerPage
    );
    this.displayedImages = [...this.displayedImages, ...nextPageImages];
    this.currentPage++;
  }

  // searchPokemon(n?: number): void {
  //   if (n === undefined) {
  //     this.resetLoadPokemon(); // Reseta caso não haja termo de pesquisa
  //   } else {
  //     this.numbers = [n]; // Aplica a pesquisa
  //     this.displayedImages = [];
  //     this.currentPage = 0;
  //     this.loadMoreImages();
  //   }




  // }

  searchPokemon() {
    if (this.searchTerm) {
      this.pokemonService.getPokemon(this.searchTerm.toLowerCase()).subscribe((pokemon) => {
        console.log('Pokémon encontrado:', pokemon); // Logando o Pokémon encontrado
        this.numbers = [pokemon.id]; // Exibe o Pokémon buscado
        this.displayedImages = [];
        this.currentPage = 0;
        this.loadMoreImages();
      });
    } else {
      this.loadMoreImages();; // Se não houver busca, carrega todos os Pokémons
    }
  }

  resetLoadPokemon(): void {
    this.numbers = Array.from({ length: 1025 }, (_, i) => i + 1); // Restaura todos os números
    this.displayedImages = []; // Limpa as imagens exibidas
    this.currentPage = 0; // Reinicia a contagem de páginas
    this.loadMoreImages(); // Carrega as primeiras imagens novamente
  }
}