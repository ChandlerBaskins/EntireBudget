import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent {
  constructor(private auth: AuthService) {this.auth.user$.subscribe(res => console.log(res))}
  login() {
    this.auth.loginWithRedirect();
    
  }
}
