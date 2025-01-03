import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError, filter, forkJoin, map, Observable, of, switchMap } from 'rxjs';
import { PokemonData } from '../models/pokemonData'
import { TypeData } from '../models/typeData';
import { PokemonList } from '../models/pokemonList';
import { ItemData } from '../models/itemData';
import { MoveData } from '../models/moveData';
import { ItemCategoryData } from '../models/itemCategoryData';
import { EvolutionChainData } from '../models/evolutionChainData';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private baseURL: string = ""
  private pokeData: PokemonData | any
  private typeData: TypeData | any
  private itemData: ItemData | any
  private moveData: MoveData | any
  private itemCategoryData: ItemCategoryData | any
  private evolutionChainData: EvolutionChainData | any
  private pokeList: PokemonList | any
  displayed: number[] = [];
  objectsPerPage: number = 24;
  currentPage: number = 0;
  isSearching: boolean = false;
  isLoading: boolean = false;


  constructor(private http: HttpClient) {
    this.baseURL = environment.pokeApi
  }

  getPokemon(pokemonName: string): Observable<PokemonData> {
    this.pokeData = this.http.get<PokemonData>(`${this.baseURL}pokemon/${pokemonName}`)

    return this.pokeData
  }

  getSpecies(speciesName: string): Observable<any>{
    return this.http.get<any>(`${this.baseURL}pokemon-species/${speciesName}`)
  }
  
  getEvolutionChain(evolutionChainUrl: string): Observable<EvolutionChainData> {
    this.evolutionChainData = this.http.get<EvolutionChainData>(evolutionChainUrl);

    return this.evolutionChainData
  }

  // getPokemon(pokemonName: string): Observable<PokemonData> {
  //   return this.http.get<PokemonData>(`${this.baseURL}pokemon/${pokemonName}`).pipe(
  //     switchMap((pokemon) =>
  //       this.getEvolutionChain(pokemonName).pipe(
  //         map((evolutionChain) => {
  //           pokemon.evolutionChain = evolutionChain; // Associa a cadeia de evolução
  //           return pokemon;
  //         })
  //       )
  //     )
  //   );
  // }

  // getEvolutionChain(pokemonName: string): Observable<any> {
  //   return this.http.get<any>(`${this.baseURL}pokemon-species/${pokemonName}`).pipe(
  //     map((speciesData) => speciesData.evolution_chain.url),
  //     switchMap((evolutionUrl) => this.http.get<any>(evolutionUrl)),
  //     catchError(() => of(null)) // Retorna null em caso de erro
  //   );
  // }

  getPokemonList(): Observable<PokemonList> {
    return this.http.get<PokemonList>(`${this.baseURL}pokemon?limit=1025`);
  }

  getType(typeName: string): Observable<TypeData> {
    this.typeData = this.http.get<TypeData>(`${this.baseURL}type/${typeName}`)

    return this.typeData
  }

 

  getItem(itemName: string): Observable<ItemData> {
    this.itemData = this.http.get<ItemData>(`${this.baseURL}item/${itemName}`)

    return this.itemData
  }

  getMove(moveName: string): Observable<MoveData> {
    this.moveData = this.http.get<MoveData>(`${this.baseURL}move/${moveName}`)

    return this.moveData
  }

  getItemCategory(itemCategoryID: number): Observable<ItemCategoryData> {
    this.itemCategoryData = this.http.get<ItemCategoryData>(`${this.baseURL}item-category/${itemCategoryID}`).pipe(
      catchError(err => {
        // console.error(`Erro ao carregar a categoria com ID ${itemCategoryID}:`, err);
        return of(null); // Retorna null em caso de erro
      })
    );
        return this.itemCategoryData
  }

  hasMore(object: number[]): boolean {
    return this.currentPage * this.objectsPerPage < object.length;
  }

  // loadMore(object: number[]) {
  //   const nextPageObjects = object.slice(
  //     this.currentPage * this.objectsPerPage,
  //     (this.currentPage + 1) * this.objectsPerPage
  //   );
  //   this.displayed = [...this.displayed, ...nextPageObjects];
  //   this.currentPage++;
  // }

  loadMore(object: number[], type: 'pokemon' | 'item' | 'move') {
    if(this.isLoading) return

    this.isLoading = true;
    
    const nextPageObjects = object.slice(
      this.currentPage * this.objectsPerPage,
      (this.currentPage + 1) * this.objectsPerPage
    );

    const checkObservables = nextPageObjects.map(id => 
      this.checkObjectExistence(type, id).pipe(
        map(exists => exists ? id : null) // Se existir, retorna o ID, senão retorna null
      )
    );
  
    // Usa forkJoin para aguardar todas as verificações de existência
    forkJoin(checkObservables).subscribe(validItems => {
      // Filtra os itens válidos (não nulos)
      const validObjects = validItems.filter(id => id !== null);
      this.displayed = [...this.displayed, ...validObjects];
      this.currentPage++;
      this.isLoading = false;
    });
  }

  checkObjectExistence(type: 'pokemon' | 'item' | 'move', id: number): Observable<boolean> {
    let url: string;
    
    switch (type) {
      case 'pokemon':
        url = `${this.baseURL}pokemon/${id}`;
        break;
      case 'item':
        url = `${this.baseURL}item/${id}`;
        break;
      case 'move':
        url = `${this.baseURL}move/${id}`;
        break;
      default:
        return of(false); // Caso não seja um tipo reconhecido
    }

    return this.http.get(url).pipe(
      map(() => true), // Se a requisição for bem-sucedida, retorna true
      catchError(() => of(false)) // Se der erro (ex.: 404), retorna false
    );
  }
  // checkItemExistence(id: number) {
  //   // Retorna um Observable que verifica se o item existe
  //   return this.http.get<ItemData>(`${this.baseURL}item/${id}`).pipe(
  //     map(() => true), // Se a requisição for bem-sucedida, o item existe
  //     catchError(() => of(false)) // Se der erro (ex.: 404), o item não existe
  //   );
  // }


  search(searchTerm: string, object: number[], tipo: number) {
    let objects: number[] = object
    if (searchTerm) {
      this.isSearching = true;
      if (tipo === 1) {
        this.getPokemon(searchTerm.toLowerCase()).subscribe((pokemon) => {
          objects = [pokemon.id]; // Exibe o Pokémon buscado
          this.displayed = [];
          this.currentPage = 0;
          this.loadMore(objects, 'pokemon');
        });
      }
      if (tipo === 2) {
        this.getItem(searchTerm.toLowerCase()).subscribe((item) => {
          objects = [item.id]; // Exibe o Pokémon buscado
          this.displayed = [];
          this.currentPage = 0;
          this.loadMore(objects, 'item');
        });
      }
      if (tipo === 3) {
        this.getMove(searchTerm.toLowerCase()).subscribe((move) => {
          objects = [move.id]; // Exibe o Pokémon buscado
          this.displayed = [];
          this.currentPage = 0;
          this.loadMore(objects, 'move');
        });
      }

    } else {
      this.isSearching = false;
      objects = object
      this.displayed = []; // Limpa as imagens exibidas
      this.currentPage = 0; // Reinicia a contagem de páginas
      this.loadMore(object, 'pokemon');; // Se não houver busca, carrega todos os Pokémons
    }
  }

  resetPages() {
    this.displayed = [];
    this.objectsPerPage = 24;
    this.currentPage = 0;
    this.isSearching = false;
  }

  onScroll(object:number[], type: 'pokemon' | 'item' | 'move') {
    const scrollPosition = window.pageYOffset + window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollPercentage = (scrollPosition / documentHeight) * 100;
  
    if (scrollPercentage > 98 && !this.isSearching && this.hasMore(object) && !this.isLoading) {
      this.loadMore(object,type);
    }
  }

}