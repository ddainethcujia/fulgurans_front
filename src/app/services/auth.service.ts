import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  URL = 'http://localhost:4000/auth'; 

  constructor(private http: HttpClient) { }

  register(nombre: string, email: string, password: string) {
    return this.http.post(`${this.URL}/signup`, { nombre, email, password });
  }

  login(email: string, password: string) {
    return this.http.post(`${this.URL}/signin`, { email, password });
  }

  logout() {
    localStorage.removeItem('token');
  }

  getIdFromToken(): string {
    const token = localStorage.getItem('token');
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1])); // Decodificar el JWT
      return payload.userId;
    }
    return '';
  }
}
