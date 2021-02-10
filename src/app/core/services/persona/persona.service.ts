import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Persona } from '../../models/persona.model';
import { Observable } from 'rxjs';
import { TipoDocumento } from '../../models/tipoDocumento.model';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  private API_URL = 'https://localhost:9003/api/persona';
  private API_URL_PROD = 'https://spring-registro-empleados-back.herokuapp.com/api/persona';

  constructor(private readonly httpClient: HttpClient) { }

  registrarUsuario(): Observable<Persona[]> {
    return this.httpClient.get<Persona[]>(this.API_URL);
  }

  tipoDocumentos(): Observable<TipoDocumento[]> {
    return this.httpClient.get<TipoDocumento[]>(this.API_URL + '/tipoDocumento');
  }

  actualizarPersona(persona: Persona): Observable<Persona> {
    return this.httpClient.put<Persona>(this.API_URL, persona);
  }

  crearPersona(persona: Persona): Observable<Persona> {
    return this.httpClient.post<Persona>(this.API_URL, persona);
  }

  eliminarPersona(idPersona: number): Observable<string> {
    return this.httpClient.delete<string>(`${this.API_URL}/${idPersona}`);
  }
}
