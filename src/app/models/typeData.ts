export class TypeData {
  id: number;
  name: string;
  sprites: {
    "generation-viii": {
      "sword-shield": {
        name_icon: string;
      };
    };
  };

  constructor() {
    this.id = 0;
    this.name = '';
    this.sprites = {
      "generation-viii": {
        "sword-shield": {
          name_icon: '',
        },
      },
    };
  }
}