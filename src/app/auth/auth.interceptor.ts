import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    // Récupérer le token depuis le localStorage
    const authToken = localStorage.getItem('auth_token');

    // Cloner la requête et ajouter le header d'authentification si le token est présent
    const authReq = authToken ? request.clone({
      setHeaders: {
        Authorization: `Bearer ${authToken}`
      }
    }) : request;
  
    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Si l'erreur est une erreur 401 Unauthorized, rediriger vers la page de connexion
          this.router.navigate(['/login']);
        }
        return throwError(error);
      })
    );
  }
}
