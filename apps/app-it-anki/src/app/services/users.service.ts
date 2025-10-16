import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private readonly http = inject(HttpClient);

  getAllUsers() {
    return this.http.get<any>('http://localhost:3000/api/users');
  }
}
