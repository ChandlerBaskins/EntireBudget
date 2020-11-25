import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticatonStore } from './auth.store';
import { AuthService } from '@auth0/auth0-angular';
import { tap } from 'rxjs/operators';
import { DOCUMENT } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  constructor(
    private authStore: AuthenticatonStore,
    private http: HttpClient,
    private auth: AuthService,
    @Inject(DOCUMENT) private doc: Document
  ) {}

  isAuthenticated$ = this.auth.isAuthenticated$;
  user$ = this.auth.user$.pipe(tap((res) => this.authStore.update(res)));
  isLoading$ = this.auth.isLoading$;

  login(options?) {
    console.log(options);
    this.auth.loginWithRedirect(options);
  }
  logout() {
    this.auth.logout({ returnTo: this.doc.location.origin });
  }

  checkAuthentication() {
    console.log('CHECkING');
    this.auth.isAuthenticated$.subscribe((res) => console.log(res));
    this.auth.isLoading$.subscribe((res) => console.log('res', res));
  }
}
