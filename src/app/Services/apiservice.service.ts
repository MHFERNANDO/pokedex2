
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PokeapiService {
    // Define la URL base de la PokeAPI
    private apiUrl = 'https://pokeapi.co/api/v2/';



    // El constructor recibe una instancia de HttpClient, que será utilizada para realizar solicitudes HTTP.
  constructor(private http: HttpClient) { }

   // Método para obtener información de un Pokémon por su ID.
  // Retorna un Observable, ya que las solicitudes HTTP en Angular son asíncronas.
  getPokemonID(id: number): Observable<any> {
    // Utiliza el método get del HttpClient para realizar una solicitud GET a la URL de la PokeAPI con el ID del Pokémon.
    return this.http.get(this.apiUrl+"pokemon/"+id);
    
  }

  getPokemonName(name: string): Observable<any> {
    // Utiliza el método get del HttpClient para realizar una solicitud GET a la URL de la PokeAPI con el nombre del Pokémon.
    return this.http.get(this.apiUrl+"pokemon/"+name);
  }

}