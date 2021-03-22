import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private readonly authService: AuthService) {}

  intercept(httpRequest: HttpRequest<any>, httpHandler: HttpHandler): Observable<HttpEvent<any>> {
    if (httpRequest.url.includes(`${this.authService.API_URL}/auth/login`)) {
      return httpHandler.handle(httpRequest);
    }
    if (httpRequest.url.includes(`${this.authService.API_URL}/auth/sigup`)) {
      return httpHandler.handle(httpRequest);
    }
    if (httpRequest.url.includes(`${this.authService.API_URL}/auth/resetpassword`)) {
      return httpHandler.handle(httpRequest);
    }

    this.authService.loadToken();
    const token = this.authService.getToken();
    const request = httpRequest.clone({
      headers: httpRequest.headers.set('Authorization', `Bearer ${token}`)
                                  .set('Content-Type', 'application/json')
    });

    return httpHandler.handle(request);
  }
}
