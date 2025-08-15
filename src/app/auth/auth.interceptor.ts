import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

interface JwtPayload {
  exp: number;
  iat: number;
  userId: number;
}

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();

    if (token) {
      try {
        const decoded = jwtDecode<JwtPayload>(token);

        const currentTime = Math.floor(Date.now() / 1000); // segundos
        if (decoded.exp && decoded.exp < currentTime) {
          // Token expirado
          this.authService.logout();
          this.router.navigate(['/login']);
          return next.handle(req); // não adiciona Authorization
        }

        // Token válido → adiciona Authorization
        const cloned = req.clone({
          headers: req.headers.set('Authorization', `Bearer ${token}`),
        });
        return next.handle(cloned);

      } catch (err) {
        // Token inválido → forçar logout
        this.authService.logout();
        this.router.navigate(['/login']);
      }
    }

    return next.handle(req);
  }
}
