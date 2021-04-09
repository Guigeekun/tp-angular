import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { infoPokemon } from 'src/app/models/info-pokemon.model'
import { Pokemon } from 'src/app/models/pokemon.model'
import { PagedData } from 'src/app/models/paged-data.model'

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  Url = "http://app-ec21e68e-3e55-42d7-b1ae-3eef7507a353.cleverapps.io/"
  limit: number = 20
  maxOffset: number = 151

  constructor(private httpClient: HttpClient) { }

  private handleError<T>(
    operation = 'operation',
    result?: T
  ): (error: any) => Observable<T> {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getPokemonsOffset(offset: number): Observable<PagedData<Pokemon>> {
    let url = `${this.Url}pokemons?limit=${this.limit}&offset=${offset}`
    return this.httpClient.get<PagedData<Pokemon>>(url).pipe(
      catchError(this.handleError<PagedData<Pokemon>>("getPokemons"))
    )
  }

  getPokemons(): Observable<PagedData<Pokemon>> {
    return this.httpClient.get<PagedData<Pokemon>>(this.Url + "pokemons?limit=20&offset=0")
      .pipe(
        catchError(this.handleError<PagedData<Pokemon>>("getPokemons"))
      )
  }

  getPokemonsSearch(search:string): Observable<PagedData<Pokemon>> {
    return this.httpClient.get<PagedData<Pokemon>>(this.Url + "pokemons?search=" + search)
      .pipe(
        catchError(this.handleError<PagedData<Pokemon>>("getPokemons"))
      )
  }

  getInfoPokemon(id:number): Observable<infoPokemon> {
    return this.httpClient.get<infoPokemon>(this.Url + "pokemons/" + id )
      .pipe(
        catchError(this.handleError<infoPokemon>("getInfoPokemon"))
      )
  }
}
