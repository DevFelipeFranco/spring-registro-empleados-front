import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Persona } from '../../models/persona.model';
import { Observable } from 'rxjs';
import { TipoDocumento } from '../../models/tipoDocumento.model';
import { Genero } from '../../models/genero.model';
import { EmpleadosContratados } from '../../models/empleados-contratados.model';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  private API_URL = 'http://localhost:9003/api/persona';
  private API_URL_PROD = 'https://spring-registro-empleados-back.herokuapp.com/api/persona';

  constructor(private readonly httpClient: HttpClient) { }

  registrarUsuario(): Observable<Persona[] | HttpErrorResponse> {
    return this.httpClient.get<Persona[]>(this.API_URL);
  }

  tipoDocumentos(): Observable<TipoDocumento[]> {
    return this.httpClient.get<TipoDocumento[]>(this.API_URL + '/tipoDocumento');
  }

  generos(): Observable<Genero[]> {
    return this.httpClient.get<Genero[]>(this.API_URL + '/genero');
  }

  actualizarPersona(persona: Persona): Observable<Persona> {
    return this.httpClient.put<Persona>(this.API_URL, persona);
  }

  crearPersona(persona: Persona): Observable<Persona> {
    return this.httpClient.post<Persona>(this.API_URL, persona);
  }

  eliminarPersona(idPersona: number): Observable<any> {
    return this.httpClient.delete(`${this.API_URL}/${idPersona}`);
  }

  consultarCantidadPersonasContratadas(): Observable<EmpleadosContratados[]> {
    return this.httpClient.get<EmpleadosContratados[]>(`${this.API_URL}/consultarPersonasContratadasPorMes`);
  }
}
