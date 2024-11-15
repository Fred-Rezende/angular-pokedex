import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PokemonData } from '../models/pokemonData'
import { TypeData } from '../models/typeData';
import { PokemonList } from '../models/pokemonList';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private baseURL: string = ""
  private pokeData: PokemonData | any
  private typeData: TypeData | any
  private pokeList: PokemonList | any
  displayedPokemons: number[] = [];
  pokemonsPerPage: number = 12;
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
    this.pokeData = this.http.get<TypeData>(`${this.baseURL}type/${typeName}`)

    return this.pokeData
  }

  hasMorePokemons(poke:number[] ): boolean {
    return this.currentPage * this.pokemonsPerPage < poke.length;
  }

  loadMorePokemons(poke:number[] ){
    const nextPagePokemons = poke.slice(
      this.currentPage * this.pokemonsPerPage,
      (this.currentPage + 1) * this.pokemonsPerPage
    );
    this.displayedPokemons = [...this.displayedPokemons, ...nextPagePokemons];
    this.currentPage++;
  }

  searchPokemon(searchTerm:string, poke:number[]) {
    let pokemons: number[]=poke
    if (searchTerm) {
      this.isSearching = true;
      this.getPokemon(searchTerm.toLowerCase()).subscribe((pokemon) => {
        console.log('Pokémon encontrado:', pokemon); // Logando o Pokémon encontrado
        pokemons = [pokemon.id]; // Exibe o Pokémon buscado
        this.displayedPokemons = [];
        this.currentPage = 0;
        this.loadMorePokemons(pokemons);
      });
    } else {
      this.isSearching = false;
      pokemons = poke
      this.displayedPokemons = []; // Limpa as imagens exibidas
      this.currentPage = 0; // Reinicia a contagem de páginas
      this.loadMorePokemons(poke);; // Se não houver busca, carrega todos os Pokémons
    }
  }

}