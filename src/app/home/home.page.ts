import { Component } from '@angular/core';
import { PokeapiService } from '../Services/apiservice.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Firestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(private api: PokeapiService, private sanitizer: DomSanitizer, private db:Firestore) {}

  imagenAPI: any;
  idPoke!: number;
  idNombre!: string;
  tipoPokemon: string[] = []; // Array para almacenar los tipos de Pokémon.

  // Método para obtener datos de un Pokémon dado su ID o nombre.
  searchPokemon() {
    try {
      // Intenta convertir el término de búsqueda en un número.
      const id = parseInt(this.idPoke.toString());
      if (!isNaN(id)) {
        // Si es un número, busca por ID.
        this.getPokemonDataID(id);
      } else {
        // Si no es un número, busca por nombre.
        this.getPokemonDataName(this.idPoke.toString().toLowerCase()); // Convierte el nombre a minúsculas.
      }
    } catch (error) {
      console.log(error);
    }
  }

  // Método para obtener datos de un Pokémon dado su ID.
  getPokemonDataID(id: number) {
    this.api.getPokemonID(id).subscribe((response => {
      this.idNombre = response.name;
      this.tipoPokemon = response.types.map((type: any) => type.type.name); // Obtener los tipos directamente de la respuesta.
      const imagenAPI = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + id + '.png';
      this.imagenAPI = this.sanitizer.bypassSecurityTrustResourceUrl(imagenAPI);
      console.log(this.idNombre);
    }));
  }

  // Método para obtener datos de un Pokémon dado su nombre.
  getPokemonDataName(name: string) {
    this.api.getPokemonName(name).subscribe((response => {
      this.idNombre = response.name;
      this.idPoke = response.id;
      this.tipoPokemon = response.types.map((type: any) => type.type.name); // Obtener los tipos directamente de la respuesta.
      const imagenAPI = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + this.idPoke + '.png';
      this.imagenAPI = this.sanitizer.bypassSecurityTrustResourceUrl(imagenAPI);
      console.log(this.idPoke);
    }));
  }

  // Función para obtener los tipos de Pokémon a partir de la respuesta.
  obtenerTipoPokemon(response: any) {
    this.tipoPokemon = response.types.map((type: any) => type.type.name);
  }
  
}

