// export type PokemonData = {
//   id: number
//   species: {
//     name: string
//   }
//   sprites: {
//     front_default: string
//     other: {
//       "official-artwork": {
//         front_default: string
//       }
//     }
//   }
//   types: {
//     slot: number
//     type: {
//       name: string
//       url: string
//     }
//   }[]
// }

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
    };
  };
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
      },
    };
    this.types = [];
  }
}