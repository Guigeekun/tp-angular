import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon.model'
import { PokemonService } from 'src/app/pokemons/services/pokemon.service'


@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {

  pokemons: Pokemon[] = []
  offset: number
  @Output() idEmitter = new EventEmitter()

  constructor(private pokeServ: PokemonService) {
    this.offset = this.pokeServ.limit;
   }

  ngOnInit(): void {
    this.getPokes()
  }

  getPokes(): void{
    this.pokeServ.getPokemons().subscribe(pokes => this.pokemons = pokes.data)
  }

  pick(id:number): void{
    this.idEmitter.emit(id)
    console.log("id emitted")
  }

  search(value:string){
    if(value){
    this.pokeServ.getPokemonsSearch(value).subscribe(pokes => this.pokemons = pokes.data)
    }else{
      this.offset=20
      this.getPokes()
    }
  }

  onScroll(): void {
    console.log("scrolled")
    if (this.offset < this.pokeServ.maxOffset) {
      this.pokeServ.getPokemonsOffset(this.offset).subscribe(result => this.pokemons = this.pokemons.concat(result.data))
      this.offset += this.pokeServ.limit
    }
  }
}
