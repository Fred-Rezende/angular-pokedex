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
  private baseURL:string = "" 
  private pokeData:PokemonData | any
  private typeData:TypeData | any
  private pokeList:PokemonList | any

 
  constructor(
    private http:HttpClient
  ) { 
    this.baseURL = environment.pokeApi
  }

  getPokemon( pokemonName:string):Observable<PokemonData>{
    this.pokeData = this.http.get<PokemonData>(`${this.baseURL}pokemon/${pokemonName}`)

    return this.pokeData  
  }

  getPokemonList(): Observable<PokemonList> {
    return this.http.get<PokemonList>(`${this.baseURL}pokemon?limit=10`);
  }

  getType( typeName:string):Observable<TypeData>{
    this.pokeData = this.http.get<TypeData>(`${this.baseURL}type/${typeName}`)

    return this.pokeData  
  }

  
}