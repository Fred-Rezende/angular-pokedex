import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError, filter, map, Observable } from 'rxjs';
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

  loadMore(object: number[]) {
    const nextPageObjects = object.slice(
      this.currentPage * this.objectsPerPage,
      (this.currentPage + 1) * this.objectsPerPage
    );
    this.displayed = [...this.displayed, ...nextPageObjects];
    this.currentPage++;
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