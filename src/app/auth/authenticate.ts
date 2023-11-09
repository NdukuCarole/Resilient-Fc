import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  check(): boolean {
    return !!localStorage.getItem('token');
  }
  login(token: string) {
    localStorage.setItem('token', token);
    location.reload();
  }

  logout() {
    localStorage.removeItem('token');
    window.location.href = '/';
  }
}
