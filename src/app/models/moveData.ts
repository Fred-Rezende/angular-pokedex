import { TypeData } from './typeData';

export class MoveData {
    id: number
    name: string
    power: number
    accuracy: number
    pp: number
    effect_entries: {
        
            effect: string
            short_effect: string
        
    }[];
    type: {
        name: string
        url: string
        typeImage: TypeData
    }
  

    constructor() {
        this.id = 0;
        this.name = '';
        this.power = 0;
        this.accuracy = 0;
        this.pp = 0;
        this.effect_entries = [];
        this.type = {
            name: '',
            url: '',
            typeImage: new TypeData()
        };
    }
}