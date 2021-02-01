import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegistarUsuario, Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private readonly httpClient: HttpClient) { }

  registrarUsuario(usuario: RegistarUsuario): Observable<any> {
    return this.httpClient.post('https://localhost:9003/api/auth/signup', usuario, { responseType: 'text' });
  }
}
