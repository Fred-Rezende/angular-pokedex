import { MoveData } from './moveData';

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
  moves: {
    move: {
      name: string;
      url: string;
    };
    version_group_details: {
      level_learned_at: number;
      move_learn_method: {
        name: string;
        url: string;
      };
      version_group: {
        name: string;
        url: string;
      };
    }[];
    details?: MoveData; // Incluímos a instância de MoveData aqui
  }[];

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
    this.moves = [];
    this.stats = [];
    this.types = [];
    // this.evolvesFrom = null;
    // this.evolutionChain = null;
  }
}