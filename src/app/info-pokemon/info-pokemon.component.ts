import { Component, OnInit, Input } from '@angular/core';
import { PokemonService } from 'src/app/pokemons/services/pokemon.service';
import { infoPokemon } from 'src/app/models/info-pokemon.model';

@Component({
  selector: 'app-info-pokemon',
  templateUrl: './info-pokemon.component.html',
  styleUrls: ['./info-pokemon.component.scss'],
})
export class InfoPokemonComponent implements OnInit {
  infos?: infoPokemon;
  @Input() id?: string;

  constructor(private pokeServ: PokemonService) {}

  ngOnChanges() {
    this.getPoke();
  }

  ngOnInit(): void {
    console.log('hey init info' + this.id);
    this.getPoke();
  }

  getPoke(): void {
    this.pokeServ
      .getInfoPokemon(Number(this.id))
      .subscribe((pokes) => (this.infos = pokes));
    console.log(this.infos);
  }
}
