export class EvolutionChainData {
    is_baby: boolean;
    species: {
        name: string;
        url: string;
    };
    evolution_details: {
        length: number;
        0:{
            min_level: number;
            item: {
                name: string;
                url: string;
             };
            trigger: {
                name: string;
                url: string;
            };
        }
    };
    evolves_to: EvolutionChainData[];

    constructor() {
        this.is_baby = false;
        this.species = {
            name: '',
            url: '',
        };
        this.evolution_details = {
            length: 0,
            0:{min_level: 0,
            item: {
                name: '',
                url: '',
            },
            trigger: {
                name: '',
                url: '',
            },
        }};
        this.evolves_to = [];
    }
}