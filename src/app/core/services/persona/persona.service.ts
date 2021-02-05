import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Persona } from '../../models/persona.model';
import { Observable } from 'rxjs';
import { TipoDocumento } from '../../models/tipoDocumento.model';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  constructor(private readonly httpClient: HttpClient) { }

  registrarUsuario(): Observable<Persona[]> {
    return this.httpClient.get<Persona[]>('https://localhost:9003/api/persona');
  }

  tipoDocumentos(): Observable<TipoDocumento[]> {
    return this.httpClient.get<TipoDocumento[]>('https://localhost:9003/api/persona/tipoDocumento');
  }
}
