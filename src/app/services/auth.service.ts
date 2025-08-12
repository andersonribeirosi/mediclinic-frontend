import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

interface LoginResponse {
  token: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenKey = 'mediclinic_token';
  private authSubject = new BehaviorSubject<boolean>(this.hasToken());

  constructor(private http: HttpClient) {}

  private hasToken(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  login(username: string, password: string): Observable<LoginResponse> {
    // return this.http.post<LoginResponse>('/api/auth/login', { username, password }).pipe(
    return this.http.post<LoginResponse>('http://localhost:3000/auth', { username, password }).pipe(
      tap(res => {
        localStorage.setItem(this.tokenKey, res.token);
        this.authSubject.next(true);
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.authSubject.next(false);
  }

  isAuthenticated(): Observable<boolean> {
    return this.authSubject.asObservable();
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }
}
