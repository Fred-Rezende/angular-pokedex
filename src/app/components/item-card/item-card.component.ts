import { Component, Input } from '@angular/core';
import { ItemData } from '../../models/itemData';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrl: './item-card.component.css'
})
export class ItemCardComponent {

  item: ItemData = new ItemData;


  constructor(private service: PokemonService) { }


  @Input()
  index: string = ''

  ngOnInit(): void {
    this.getItem(this.index)
  }

  getItem(searchName: string) {
    this.service.getItem(searchName).subscribe(
      {
        next: (res) => {
          this.item = Object.assign(new ItemData(), res);
        },
        error: (err) => console.log('not found')
      }
    )
  }

}

