import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticatonStore } from './auth.store';
import { AuthService } from '@auth0/auth0-angular';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  constructor(
    private authStore: AuthenticatonStore,
    private http: HttpClient,
    private auth: AuthService
  ) {}
  isAuthenticated$ = this.auth.isAuthenticated$;
  user$ = this.auth.user$.pipe(tap((res) => this.authStore.update(res)));
  login() {
    this.auth.loginWithRedirect();
  }
  logout() {
    this.auth.logout();
  }

  checkAuthentication() {
    console.log('CHECkING');
    this.auth.isAuthenticated$.subscribe((res) => console.log(res));
    this.auth.isLoading$.subscribe((res) => console.log('res', res));
  }
}
