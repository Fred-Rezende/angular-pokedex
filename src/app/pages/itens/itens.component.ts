import { Component } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-itens',
  templateUrl: './itens.component.html',
  styleUrl: './itens.component.css'
})
export class ItensComponent {
  allitens: number[] = Array.from({ length: 2180 }, (_, i) => i + 1);
  itens: number[] = this.allitens
  searchTerm: string = '';


  constructor(public pokemonService: PokemonService) {
    // this.loadMoreImages();
  }

  ngOnInit(): void {
    this.pokemonService.resetPages();
    this.pokemonService.loadMore(this.itens, 'item');
  }

  onSearch(): void {
    this.pokemonService.search(this.searchTerm, this.itens, 2);
  }

}
