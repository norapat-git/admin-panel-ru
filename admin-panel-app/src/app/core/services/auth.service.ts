import { Injectable, signal, computed } from '@angular/core';
import { Router } from '@angular/router';

export interface UserPayload {
  username: string;
  role: string;
  name: string;
  exp?: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_KEY = 'admin_jwt_token';
  
  // Reactive token signal
  private tokenSignal = signal<string | null>(this.getStoredToken());
  
  // Computed auth status
  readonly token = computed(() => this.tokenSignal());
  readonly isAuthenticated = computed(() => !!this.tokenSignal() && !this.isTokenExpired());
  readonly currentUser = computed<UserPayload | null>(() => this.getUserFromToken());

  constructor(private router: Router) {}

  private getStoredToken(): string | null {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem(this.TOKEN_KEY);
    }
    return null;
  }

  // Safe UTF-8 Base64 encode
  private utf8ToBase64(str: string): string {
    try {
      return btoa(unescape(encodeURIComponent(str)));
    } catch {
      return btoa(str);
    }
  }

  // Safe UTF-8 Base64 decode
  private base64ToUtf8(str: string): string {
    try {
      return decodeURIComponent(escape(atob(str)));
    } catch {
      return atob(str);
    }
  }

  // Generate a mock JWT for demo / initial development
  login(username: string, role = 'admin'): boolean {
    try {
      const header = this.utf8ToBase64(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
      const payload = this.utf8ToBase64(JSON.stringify({
        username,
        role,
        name: username === 'admin' ? 'ผู้ดูแลระบบหลัก' : username,
        exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60) // 1 day expiry
      }));
      const signature = this.utf8ToBase64('mock_jwt_signature');
      const mockJwt = `${header}.${payload}.${signature}`;

      this.setToken(mockJwt);
      return true;
    } catch (e) {
      console.error('Login error:', e);
      return false;
    }
  }

  setToken(token: string) {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(this.TOKEN_KEY, token);
    }
    this.tokenSignal.set(token);
  }

  getToken(): string | null {
    return this.tokenSignal();
  }

  logout() {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(this.TOKEN_KEY);
    }
    this.tokenSignal.set(null);
    this.router.navigate(['/login']);
  }

  private isTokenExpired(): boolean {
    const user = this.getUserFromToken();
    if (!user || !user.exp) return false;
    return Date.now() >= user.exp * 1000;
  }

  private getUserFromToken(): UserPayload | null {
    const token = this.tokenSignal();
    if (!token) return null;
    try {
      const parts = token.split('.');
      if (parts.length < 2) return null;
      const payloadDecoded = this.base64ToUtf8(parts[1]);
      return JSON.parse(payloadDecoded);
    } catch (e) {
      console.error('Error decoding token:', e);
      return null;
    }
  }
}
