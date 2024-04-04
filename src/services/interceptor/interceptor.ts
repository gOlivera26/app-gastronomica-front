import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 || error.status === 403) {
          if (error.error === 'Usuario no activo') {
            Swal.fire({
              icon: 'error',
              title: 'Usuario no activo',
              text: 'Por favor, contacta al administrador.',
            });
          } else {
            localStorage.removeItem('token');
            Swal.fire({
              icon: 'error',
              title: 'Sesión expirada',
              text: 'Su sesión ha caducado. Por favor, inicie sesión nuevamente.',
            }).then(() => {
              this.router.navigate(['/login']);
            });
          }
          return throwError(() => new Error('Session expired'));
        }
        return throwError(() => error);
      })
    );
  }
  
}
