import { TypeData } from './typeData';

export class MoveData {
    id: number
    name: string
    power: number
    accuracy: number
    pp: number
    effect_entries: {
        0: {
            effect: string
            short_effect: string
        }
    }
    type: {
        name: string
        url: string
        typeImage: TypeData
    }
    learned_by_pokemon: {
            name: string
            url: string
    }[]
  

    constructor() {
        this.id = 0;
        this.name = '';
        this.power = 0;
        this.accuracy = 0;
        this.pp = 0;
        this.effect_entries = {
            0: {
                effect: '',
                short_effect: ''
            }
        };
        this.type = {
            name: '',
            url: '',
            typeImage: new TypeData()
        };
        this.learned_by_pokemon = [];
    }
}