import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InfoPokemonComponent } from './info-pokemon/info-pokemon.component';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { PokedexComponent } from './pokedex/pokedex.component';

const routes: Routes = [
  { path: 'pokemonlist', component: PokemonListComponent},
  { path: 'infoPokemon/:id', component: InfoPokemonComponent},
  { path: 'pokedex', component:  PokedexComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
