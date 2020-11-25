import { Component } from '@angular/core';
import { AuthenticationService } from '../../auth/state/auth.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  constructor(public auth: AuthenticationService) {}

  register(options = { screen_hint: 'signup' }) {
    this.auth.login(options);
  }

  login(options = { redirectUri: 'http://localhost:4200/main' }) {
    this.auth.login(options);
  }

  logout() {
    this.auth.logout();
  }
}
