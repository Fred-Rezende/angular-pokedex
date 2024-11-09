import { Component, ViewChild } from '@angular/core';
// import { PokeCardComponent } from './components/poke-card/poke-card.component';

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

  // @ViewChild(PokeCardComponent) pokecardComponent!: PokeCardComponent;

  constructor() {
    this.loadMoreImages();
  }

  ngOnInit(): void {
    // this.loadMoreImages();
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

  searchPokemon(n?: number): void {
    if (n === undefined) {
      this.resetLoadPokemon(); // Reseta caso não haja termo de pesquisa
    } else {
      this.numbers = [n]; // Aplica a pesquisa
      this.displayedImages = [];
      this.currentPage = 0;
      this.loadMoreImages();
    }
    
    // this.numbers = [n]
    // this.displayedImages = []
    // this.currentPage = 0;
    // this.loadMoreImages();
    
   
  }

  resetLoadPokemon(): void {
    this.numbers = Array.from({ length: 1025 }, (_, i) => i + 1); // Restaura todos os números
    this.displayedImages = []; // Limpa as imagens exibidas
    this.currentPage = 0; // Reinicia a contagem de páginas
    this.loadMoreImages(); // Carrega as primeiras imagens novamente
  }
  // searchPokemon(name: string) {
  //   this.pokecardComponent.getPokemon(name);
  //   console.log(this.pokecardComponent.getPokemon(name))
  //   // this.numbers = []
  //   this.displayedImages = []
  //   this.currentPage = 0;
  //   this.loadMoreImages();
    
  // }



}