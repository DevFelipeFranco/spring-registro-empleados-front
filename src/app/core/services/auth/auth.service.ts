import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Login, LoginResponse, RegistarUsuario, Usuario } from '../../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private API_URL = 'https://localhost:9003/api/auth';
  private API_URL_PROD = 'https://spring-registro-empleados-back.herokuapp.com/api/auth';

  constructor(private readonly httpClient: HttpClient,
              private readonly localStorage: LocalStorageService) { }

  registrarUsuario(usuario: RegistarUsuario): Observable<any> {
    return this.httpClient.post(this.API_URL + '/signup', usuario, { responseType: 'text' });
  }

  login(login: Login): Observable<boolean> {
    return this.httpClient.post<LoginResponse>(this.API_URL + '/login', login)
      .pipe(map((data: LoginResponse) => {
        this.localStorage.store('authenticationToken', data.tokenAutenticacion);
        this.localStorage.store('username', data.usuario.usuario);
        this.localStorage.store('refreshToken', data.refreshToken);
        this.localStorage.store('expiresAt', data.expiresAt);

        return true;
      }));
  }

  getJwtToken(): any {
    return this.localStorage.retrieve('authenticationToken');
  }

  getJwtUsername(): any {
    return this.localStorage.retrieve('username');
  }
}
