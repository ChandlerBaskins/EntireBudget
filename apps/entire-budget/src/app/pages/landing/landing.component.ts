import { Component } from '@angular/core';
import { AuthenticationService } from '../../auth/state/auth.service';

@Component({
  selector: 'landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent {
  constructor(public auth: AuthenticationService) {

  }
}
