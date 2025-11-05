import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _token = signal<string | null>(null);
  private _logged = signal(false);

  login(user: string, pass: string) {
    if (user === 'admin' && pass === 'admin') {
      this._token.set('fake-token-123');
      this._logged.set(true);
    }
  }

  logout() {
    this._token.set(null);
    this._logged.set(false);
  }

  token = this._token.asReadonly();
  isLoggedIn = this._logged.asReadonly();
}
