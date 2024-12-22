export class ItemCategoryData {
    id: number
    name: string
    items: {
        name: string
        url: string
    }[]
    pocket: {
        name: string
        url: string
    }

    constructor(){
        this.id = 0;
        this.name = '';
        this.items = [];
        this.pocket = {
            name: '',
            url: '',
        }

    }
}