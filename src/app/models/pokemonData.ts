export class PokemonData {
  id: number;
  species: {
    name: string;
    url: string;
  };
  abilities: {
    ability: {
      name: string;
      url: string;
    }
    is_hidden: boolean;
    slot: number;
  }[];
  sprites: {
    front_default: string;
    other: {
      "official-artwork": {
        front_default: string;
      };
      home: {
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
  // evolvesFrom: string | null;
  // evolutionChain: string | null;

  constructor() {
    this.id = 0;
    this.species = {
      name: '',
      url: ''
    };
    this.abilities = [];
    this.sprites = {
      front_default: '',
      other: {
        "official-artwork": {
          front_default: '',
        },
        home: {
          front_default: '',
        },
      },
    };
    this.stats = [];
    this.types = [];
    // this.evolvesFrom = null;
    // this.evolutionChain = null;
  }
}