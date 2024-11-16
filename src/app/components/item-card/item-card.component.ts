import { Component, Input } from '@angular/core';
import { ItemData } from '../../models/itemData';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrl: './item-card.component.css'
})
export class ItemCardComponent {

  item: ItemData;


  constructor(private service: PokemonService) {
    this.item = {
      id: 0,
      name: '',
      cost: 0,
      sprites: {
        default: '',
      },
      category: {
        name: '',
        url: '',
      }
    }
  }


  @Input()
  index: string = ''

  ngOnInit(): void {
    this.getItem(this.index)
  }

  getItem(searchName: string) {
    this.service.getItem(searchName).subscribe(
      {
        next: (res) => {

          this.item = {
            id: res.id,
            name: res.name,
            cost: res.cost,
            sprites: res.sprites,
            category: res.category
          }
        },
        error: (err) => console.log('not found')
      }
    )
  }

}

