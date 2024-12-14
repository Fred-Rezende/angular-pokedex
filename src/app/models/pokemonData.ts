export class PokemonData {
  id: number;
  species: {
    name: string;
  };
  sprites: {
    front_default: string;
    other: {
      "official-artwork": {
        front_default: string;
      };
      home:{
        front_default: string;
      };
    };
  };
  stats: {
    base_stat: number;
    effort: number;
    stat: {
      name: string;
      url: string;
    };
  }[];
  types: {
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }[];

  constructor() {
    this.id = 0;
    this.species = { name: '' };
    this.sprites = {
      front_default: '',
      other: {
        "official-artwork": {
          front_default: '',
        },
        home:{
          front_default: '',
        },
      },
    };
    this.stats = [];
    this.types = [];
  }
}