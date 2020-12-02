import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  constructor(
    @Inject(DOCUMENT) private doc: Document,
    public auth: AuthService
  ) {}

  register(options = { screen_hint: 'signup' }) {
    this.auth.loginWithRedirect(options);
  }

  login() {
    const options = {
      appState: { target: `${this.doc.location.origin}/budget` },
    };
    this.auth.loginWithRedirect(options);
  }

  logout() {
    this.auth.logout();
  }
}
