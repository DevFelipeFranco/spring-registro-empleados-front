import { environment } from './../../../../environments/environment';
import { HttpClient, HttpResponse, HttpErrorResponse, HttpEvent, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';
import { Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { Login, LoginResponse, RegistarUsuario, Usuario } from '../../models/usuario.model';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Rol } from '../../models/rol.model';
import { Role } from '../../enum/rol.enum';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public API_URL = `${environment.apiUrl}/auth`;
  private API_URL_PROD = 'https://spring-registro-empleados-back.herokuapp.com/api/auth';
  private token: string;
  private loggedInUsername: string;
  private jwtHelper = new JwtHelperService();

  constructor(private readonly httpClient: HttpClient,
              private readonly localStorage: LocalStorageService) { }

  registrarUsuario(usuario: RegistarUsuario): Observable<any> {
    return this.httpClient.post(this.API_URL + '/signup', usuario);
  }

  login(login: Login): Observable<boolean> {
    return this.httpClient.post<LoginResponse>(this.API_URL + '/login', login)
      .pipe(map((data: LoginResponse) => {
        this.localStorage.store('authenticationToken', data.tokenAutenticacion);
        this.localStorage.store('username', data.usuario.usuario);
        this.localStorage.store('refreshToken', data.refreshToken);
        this.localStorage.store('expiresAt', data.expiresAt);
        this.localStorage.store('rol', data.usuario.roles[0].descripcion);
        return true;
      }));
  }

  consulatUsuarios(): Observable<Usuario[] | HttpErrorResponse> {
    return this.httpClient.get<Usuario[]>(`${this.API_URL}/allUsuarios`);
  }

  consultarUsuarioPorId(idUsuario: number): Observable<Usuario | HttpErrorResponse> {
    return this.httpClient.get<Usuario>(`${this.API_URL}/idUsuario/${idUsuario}`);
  }

  consularRoles(): Observable<Rol[] | HttpErrorResponse> {
    return this.httpClient.get<Rol[]>(`${this.API_URL}/consultarRoles`);
  }

  actualizarInformacionUsuario(usuario: Usuario): Observable<Usuario | HttpErrorResponse> {
    return this.httpClient.put<Usuario>(`${this.API_URL}/actualizarUsuario`, usuario);
  }

  elimiarUsuarioPorId(idUsuario: number): Observable<string | HttpErrorResponse> {
    return this.httpClient.delete<string>(`${this.API_URL}/eliminarUsuario/${idUsuario}`);
  }

  eliminarYTransferirUsuario(idUsuario: number, usuario: string): Observable<string | HttpErrorResponse> {
    return this.httpClient.delete<string>(`${this.API_URL}/eliminarTransferirUsuario/${idUsuario}/${usuario}`);
  }

  getJwtToken(): any {
    return this.localStorage.retrieve('authenticationToken');
  }

  getJwtUsername(): string {
    return this.localStorage.retrieve('username');
  }

  setIdUsuario(idUsuario: number): void {
    this.localStorage.store('idUsuario', idUsuario);
  }

  getIdUsuario(): number {
    return this.localStorage.retrieve('idUsuario');
  }

  getUserRoleCache(): string {
    return this.localStorage.retrieve('rol');
  }

  public get isAdmin(): boolean {
    return this.getUserRoleCache() === Role.ADMIN || this.getUserRoleCache() === Role.SUPER_ADMIN;
  }

  public get isManager(): boolean {
    return this.isAdmin || this.getUserRoleCache() === Role.MANAGER;
  }

  public get isAdminOrManager(): boolean {
    return this.isAdmin || this.isManager;
  }
  // ############### PRUEBA SEGUN TUTORIAL

  loginTest(login: Login): Observable<HttpResponse<any> | HttpErrorResponse> {
    return this.httpClient.post<HttpResponse<any> | HttpErrorResponse>(`${this.API_URL}/login`, login, { observe: 'response' });
  }

  public uploadProfileImage(file: File, id: number): Observable<HttpEvent<Usuario>> {
    const formData = new FormData();
    formData.append('imagenPerfil', file);
    formData.append('id', id.toLocaleString());

    return this.httpClient.post<Usuario>(`${this.API_URL}/imagen/upload`, formData, {reportProgress: true, observe: 'events'});
  }

  public logOut(): void {
    this.token = null;
    this.loggedInUsername = null;
    this.localStorage.clear();
  }

  public saveToken(token: string): void {
    this.token = token;
    this.localStorage.store('authenticationToken', token);
  }

  public addUserToLocalCache(usuario: Usuario): void {
    this.localStorage.store('usuario', usuario);
  }

  public getUsuarioFromLocalCache(): Usuario {
    return this.localStorage.retrieve('usuario');
  }

  public loadToken(): void {
    this.token = this.localStorage.retrieve('authenticationToken');
  }

  public getToken(): string {
    return this.token;
  }

  public isLoggeIn(): boolean {
    this.loadToken();
    if (this.token && this.token !== '') {
      if (this.jwtHelper.decodeToken(this.token).sub !== null || '') {
        if (!this.jwtHelper.isTokenExpired(this.token)) {
          this.loggedInUsername = this.jwtHelper.decodeToken(this.token).sub;
          return true;
        }
      }
    } else {
      this.logOut();
      return false;
    }
  }


  public createUploadProfileImage(imagenProfile: File, idUsuario: number): FormData {
    const formData = new FormData();
    console.log('Si llego informacion: ', imagenProfile);
    formData.append('imagenPerfil', imagenProfile);
    formData.append('id', JSON.stringify(idUsuario));
    console.log('Si llego informacion: ', formData.get('imagenPerfil'));
    return formData;
  }
}
