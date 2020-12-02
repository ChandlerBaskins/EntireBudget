import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  constructor(public auth: AuthService) {}

  register(options = { screen_hint: 'signup' }) {
    this.auth.loginWithRedirect(options);
  }

  login() {
    const options = { redirectUri: 'http://localhost:4200/budget' };
    this.auth.loginWithRedirect(options);
  }

  logout() {
    this.auth.logout();
  }
}
