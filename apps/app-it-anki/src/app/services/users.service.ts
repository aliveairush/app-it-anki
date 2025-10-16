import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

const ACCESS_KEY = 'access_token';

export const AuthTokenStorage = {
  get: () => sessionStorage.getItem(ACCESS_KEY),
  set: (token: string) => sessionStorage.setItem(ACCESS_KEY, token),
  clear: () => sessionStorage.removeItem(ACCESS_KEY),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);

  registerUser(params: {
    email: string;
    password: string;
  }): Observable<unknown> {
    return this.http.post<unknown>(
      `http://localhost:3000/api/auth/register`,
      params
    );
  }

  loginUser(params: { email: string; password: string }): Observable<unknown> {
    return this.http
      .post<unknown>(`http://localhost:3000/api/auth/login`, params)
      .pipe(
        tap((result: unknown) => {
          // @ts-ignore
          AuthTokenStorage.set(result?.tokens?.accessToken);
        })
      );
  }

  logout() {
    AuthTokenStorage.clear();
    return this.http.post<unknown>(`http://localhost:3000/api/auth/logout`, {});
  }
}
