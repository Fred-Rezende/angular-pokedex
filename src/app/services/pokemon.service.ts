import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError, filter, forkJoin, map, Observable, of } from 'rxjs';
import { PokemonData } from '../models/pokemonData'
import { TypeData } from '../models/typeData';
import { PokemonList } from '../models/pokemonList';
import { ItemData } from '../models/itemData';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private baseURL: string = ""
  private pokeData: PokemonData | any
  private typeData: TypeData | any
  private itemData: ItemData | any
  private pokeList: PokemonList | any
  displayed: number[] = [];
  objectsPerPage: number = 12;
  currentPage: number = 0;
  isSearching: boolean = false;


  constructor(private http: HttpClient) {
    this.baseURL = environment.pokeApi
  }

  getPokemon(pokemonName: string): Observable<PokemonData> {
    this.pokeData = this.http.get<PokemonData>(`${this.baseURL}pokemon/${pokemonName}`)

    return this.pokeData
  }

  getPokemonList(): Observable<PokemonList> {
    return this.http.get<PokemonList>(`${this.baseURL}pokemon?limit=1025`);
  }

  getType(typeName: string): Observable<TypeData> {
    this.typeData = this.http.get<TypeData>(`${this.baseURL}type/${typeName}`)

    return this.typeData
  }

  getItem(itemName: string): Observable<ItemData> {
    this.itemData = this.http.get<PokemonData>(`${this.baseURL}item/${itemName}`)

    return this.itemData
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

  loadMore(object: number[]) {
    const nextPageObjects = object.slice(
      this.currentPage * this.objectsPerPage,
      (this.currentPage + 1) * this.objectsPerPage
    );

    const checkObservables = nextPageObjects.map(id => 
      this.checkItemExistence(id).pipe(
        map(exists => exists ? id : null) // Se existir, retorna o ID, senão retorna null
      )
    );
  
    // Usa forkJoin para aguardar todas as verificações de existência
    forkJoin(checkObservables).subscribe(validItems => {
      // Filtra os itens válidos (não nulos)
      const validObjects = validItems.filter(id => id !== null);
      this.displayed = [...this.displayed, ...validObjects];
      this.currentPage++;
    });
  }

  checkItemExistence(id: number) {
    // Retorna um Observable que verifica se o item existe
    return this.http.get<ItemData>(`${this.baseURL}item/${id}`).pipe(
      map(() => true), // Se a requisição for bem-sucedida, o item existe
      catchError(() => of(false)) // Se der erro (ex.: 404), o item não existe
    );
  }


  search(searchTerm: string, object: number[], tipo: number) {
    let objects: number[] = object
    if (searchTerm) {
      this.isSearching = true;
      if (tipo === 1) {
        this.getPokemon(searchTerm.toLowerCase()).subscribe((pokemon) => {
          objects = [pokemon.id]; // Exibe o Pokémon buscado
          this.displayed = [];
          this.currentPage = 0;
          this.loadMore(objects);
        });
      }
      if (tipo === 2) {
        this.getItem(searchTerm.toLowerCase()).subscribe((item) => {
          objects = [item.id]; // Exibe o Pokémon buscado
          this.displayed = [];
          this.currentPage = 0;
          this.loadMore(objects);
        });
      }

    } else {
      this.isSearching = false;
      objects = object
      this.displayed = []; // Limpa as imagens exibidas
      this.currentPage = 0; // Reinicia a contagem de páginas
      this.loadMore(object);; // Se não houver busca, carrega todos os Pokémons
    }
  }

  resetPages() {
    this.displayed = [];
    this.objectsPerPage = 12;
    this.currentPage = 0;
    this.isSearching = false;
  }

}