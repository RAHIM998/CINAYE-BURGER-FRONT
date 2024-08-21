import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Users } from 'src/app/model/Users/users';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<{ success: boolean, message: string, data: { access_token: string, user: Users } }> {
    return this.http.post<{ success: boolean, message: string, data: { access_token: string, user: Users } }>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap(response => this.setSession(response.data.access_token))
    );
  }

  private setSession(token: string): void {
    localStorage.setItem('auth_token', token);
  }

  logout(): Observable<{ success: boolean, message: string }> {
    return this.http.post<{ success: boolean, message: string }>(`${this.apiUrl}/logout`, {}, {
      headers: { 'Authorization': `Bearer ${this.getToken()}` }
    });
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('auth_token');
  }

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }
}
