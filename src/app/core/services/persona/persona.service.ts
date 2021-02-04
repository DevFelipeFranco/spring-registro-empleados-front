import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Persona } from '../../models/persona.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  constructor(private readonly httpClient: HttpClient) { }

  registrarUsuario(): Observable<Persona[]> {
    return this.httpClient.get<Persona[]>('https://localhost:9003/api/persona');
  }
}
