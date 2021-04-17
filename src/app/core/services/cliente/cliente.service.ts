import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Cliente } from '../../models/cliente.model';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private API_URL = 'http://localhost:9003/api/clientes';

  constructor(private readonly httpClient: HttpClient) { }

  consultarClientes(esActivo: boolean = true): Observable<Cliente[] | HttpErrorResponse> {
    let params = new HttpParams();
    params = params.append('esActivo', esActivo.toString());
    return this.httpClient.get<Cliente[]>(this.API_URL, { params });
  }
}
