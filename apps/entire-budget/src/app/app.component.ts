import { Component } from '@angular/core';
import { AuthenticationService } from './auth/state/auth.service';

@Component({
  selector: 'entire-budget-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  constructor(public auth: AuthenticationService){}
}
