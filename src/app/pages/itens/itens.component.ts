import { Component } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { ItemCategoryData } from '../../models/itemCategoryData';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-itens',
  templateUrl: './itens.component.html',
  styleUrl: './itens.component.css'
})
export class ItensComponent {
//   allitens: number[] = Array.from({ length: 2180 }, (_, i) => i + 1);
//   itens: number[] = this.allitens
//   searchTerm: string = '';


//   constructor(public pokemonService: PokemonService) {
//     // this.loadMoreImages();
//   }

//   ngOnInit(): void {
//     this.pokemonService.resetPages();
//     this.pokemonService.loadMore(this.itens, 'item');
//   }

//   onSearch(): void {
//     this.pokemonService.search(this.searchTerm, this.itens, 2);
//   }

// }

allCategories: number[] = Array.from({ length: 54 }, (_, i) => i + 1); 
categories: ItemCategoryData[] = [];
selectedCategory: string = 'all';
allitens: number[] = Array.from({ length: 2180 }, (_, i) => i + 1);
itens: number[] = this.allitens;
searchTerm: string = '';

constructor(public pokemonService: PokemonService) {}

ngOnInit(): void {
  this.loadCategories(); // Carrega as categorias
  this.pokemonService.resetPages();
  this.pokemonService.loadMore(this.itens, 'item');
}

onSearch(): void {
      this.pokemonService.search(this.searchTerm, this.itens, 2);
    }

loadCategories(): void {
  const categoryObservables = this.allCategories.map(id =>
    this.pokemonService.getItemCategory(id)
  );

  // Usa forkJoin para carregar todas as categorias simultaneamente
  forkJoin(categoryObservables).subscribe(categories => {
    this.categories = categories.filter(category => category !== null); // Remove categorias inválidas
    // console.log('Categorias carregadas:', this.categories);
  });
}

onCategoryChange(categoryName: string): void {
  // console.log('Categoria selecionada:', categoryName);
  if (categoryName === 'all') {
    this.itens = this.allitens; // Mostra todos os itens
  } else {
    const selectedCategory = this.categories.find(cat => cat.name === categoryName);
    if (selectedCategory) {
      const itemIds = selectedCategory.items.map(item => parseInt(item.url.split('/').slice(-2, -1)[0]));
      this.itens = itemIds; // Filtra os itens pela categoria selecionada
    }
  }

  this.pokemonService.resetPages(); // Reseta as páginas
  this.pokemonService.loadMore(this.itens, 'item'); // Recarrega os itens filtrados
}
}