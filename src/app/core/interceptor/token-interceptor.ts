import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { AuthService } from '../services/auth/auth.service';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

    constructor(public authService: AuthService,
                private readonly router: Router) {

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const jwtToken = this.authService.getJwtToken();

        let request = req;

        if (jwtToken) {
            request = req.clone({
                headers: req.headers.set('Authorization', 'Bearer ' + jwtToken)
                                    .set('Content-Type', 'application/json')
            });
        }

        // if (jwtToken) {
        //     return next.handle(this.addToken(req, jwtToken)).pipe(
        //         catchError((error: HttpErrorResponse) => {
        //             if (error.status === 401 || error.status === 403) {
        //                 this.router.navigateByUrl('/login');
        //             }
        //             return throwError(error);
        //         })
        //     );
        // }

        // return next.handle(req);

        return next.handle(request).pipe(
            catchError((err: HttpErrorResponse) => {

                if (err.status === 401) {
                    this.router.navigateByUrl('/login');
                }

                return throwError(err);

            })
        );
    }

    private addToken(req: HttpRequest<any>, jwtToken: any): any {
        return req.clone({
            headers: req.headers.set('Authorization', 'Bearer ' + jwtToken)
        });
    }
}
