// export type ItemData = {
//     id: number
//     name: string
//     cost: number
//     sprites: {
//         default: string
//     }
//     category: {
//         name: string
//         url: string
//     }
// }

export class ItemData {
    id: number
    name: string
    cost: number
    sprites: {
        default: string
    }
    category: {
        name: string
        url: string
    }

    constructor() {
        this.id = 0;
        this.name = '';
        this.cost = 0;
        this.sprites = {
            default: ''
        };
        this.category = {
            name: '',
            url: ''
        };
    }
}