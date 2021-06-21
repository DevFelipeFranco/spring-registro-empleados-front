import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  private API_URL = 'http://localhost:9003/api/report';

  constructor(private readonly httpClient: HttpClient) { }

  generarReporte(): Observable<any> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('responseType', 'arrayBuffer');
    return this.httpClient.get(this.API_URL + '/rptPersonasActivasExcel', {responseType: 'arraybuffer'});
  }

  generarReporteEmpleadosSinProyecto(): Observable<any> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('responseType', 'arrayBuffer');
    return this.httpClient.get(this.API_URL + '/rptEmpleadosSinProyectoExcel', {responseType: 'arraybuffer'});
  }

  generarReporteEmpleadosInactivos(): Observable<any> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('responseType', 'arrayBuffer');
    return this.httpClient.get(this.API_URL + '/rptPersonasInactivasExcel', {responseType: 'arraybuffer'});
  }

  generarReporteClientesInactivos(): Observable<any> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('responseType', 'arrayBuffer');
    return this.httpClient.get(this.API_URL + '/rptClientesInactivasExcel', {responseType: 'arraybuffer'});
  }
}
