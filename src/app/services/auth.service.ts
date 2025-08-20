import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { API_ENDPOINTS } from '../config/api.config';
import { TokenService } from './token.service';
import { UserService } from './user.service';


export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthResponse {
  token?: string;
  user?: {
    id?: string;
    name?: string;
    email?: string;
  }
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
    private userService: UserService
  ) { }

  login(payload: LoginPayload): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(API_ENDPOINTS.auth.login, payload)
      .pipe(tap((res) => {
        if (res.token && res.user) {
          this.tokenService.setToken(res.token)
          this.userService.setUser({
            id: res.user.id ? parseInt(res.user.id, 10) : 0,
            username: res.user.name || '',
            email: res.user.email || ''
          });
        }
      }));
  }

  register(payload: RegisterPayload): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(API_ENDPOINTS.auth.register, payload)
      .pipe(tap((res) => {
        if (res.token) {
          this.tokenService.setToken(res.token)
        }
      }));
  }

  logout(): Observable<void> {
    this.tokenService.clearToken();
    return this.http.post<void>(API_ENDPOINTS.auth.logout, {});
  }

  isAuthenticated(): boolean {
    return !!this.tokenService.getToken();
  }
}