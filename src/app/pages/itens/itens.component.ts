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

// Opção 1 Filtro Categoria

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



/* Opção 2 Filtro de Categoria agrupados pelo Pocket
allCategories: number[] = Array.from({ length: 54 }, (_, i) => i + 1); 
categories: ItemCategoryData[] = [];
groupedCategories: { [key: string]: ItemCategoryData[] } = {};
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
    this.groupCategoriesByPocket(); // Agrupa as categorias por pocket
  });
}

groupCategoriesByPocket(): void {
  this.groupedCategories = this.categories.reduce((groups, category) => {
    const pocketName = category.pocket.name;
    if (!groups[pocketName]) {
      groups[pocketName] = [];
    }
    groups[pocketName].push(category);
    return groups;
  }, {} as { [key: string]: ItemCategoryData[] });
}

onCategoryChange(categoryName: string): void {
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
*/

/* Opção 3 Escolha de Grupo e depois de categoria
allCategories: number[] = Array.from({ length: 54 }, (_, i) => i + 1); 
categories: ItemCategoryData[] = [];
selectedCategory: string = 'all';
allitens: number[] = Array.from({ length: 2180 }, (_, i) => i + 1);
itens: number[] = this.allitens;
searchTerm: string = '';

selectedGroupIndex: number = 0; 

categoryGroups = [
  {
    name: 'Pokébolas',
    categories: [33, 34, 39], // IDs das categorias que pertencem ao grupo
  },
  {
    name: 'Consumíveis',
    categories: [1, 2, 3], // Exemplo: IDs de categorias relacionadas a consumíveis
  },
  {
    name: 'TMs/HMs',
    categories: [4, 5, 6], // Exemplo: IDs de categorias relacionadas a TMs/HMs
  }
];

selectedGroup: { name: string; categories: number[] } | null = null; // Grupo selecionado
filteredCategories: ItemCategoryData[] = []; // Armazena as categorias do grupo selecionado

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


onCategoryChange(event: Event): void {
  const target = event.target as HTMLSelectElement;
  const categoryName = target.value;

  if (!categoryName) {
    return; // Se o valor for inválido, não faz nada
  }

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

onGroupChange(event: Event): void {
  const target = event.target as HTMLSelectElement;
  const groupName = target.value;

  // Verifica se o valor do grupo é válido
  const selectedGroup = this.categoryGroups.find(group => group.name === groupName) || null;

  if (!selectedGroup) {
    this.filteredCategories = []; // Nenhum grupo selecionado
    this.itens = this.allitens;   // Mostra todos os itens
    this.pokemonService.resetPages();
    this.pokemonService.loadMore(this.itens, 'item');
    return;
  }

  this.selectedGroup = selectedGroup;

  // Filtra as categorias pertencentes ao grupo selecionado
  this.filteredCategories = this.categories.filter(cat =>
    selectedGroup.categories.includes(cat.id)
  );

  // Redefine os itens
  this.itens = [];
  this.pokemonService.resetPages();
}
*/
}