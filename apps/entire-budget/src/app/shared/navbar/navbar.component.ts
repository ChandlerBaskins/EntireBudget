import { Component, OnInit } from '@angular/core';
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
  login() {
    this.auth.login();
  }
}
