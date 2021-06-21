import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
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

  consultarUsuario(esActivo: boolean = true): Observable<Persona[] | HttpErrorResponse> {
    let params = new HttpParams();
    params = params.append('esActivo', esActivo.toString());
    return this.httpClient.get<Persona[]>(this.API_URL, {params});
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

  eliminarPersona(idPersona: number, motivo: string): Observable<any> {
    return this.httpClient.delete(`${this.API_URL}/${idPersona}/motivo/${motivo}`);
  }

  consultarCantidadPersonasContratadas(): Observable<EmpleadosContratados[]> {
    return this.httpClient.get<EmpleadosContratados[]>(`${this.API_URL}/consultarPersonasContratadasPorMes`);
  }
}
