import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
@Component({
  selector: 'entire-budget-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(public auth: AuthService, private router: Router) {
    this.auth.isAuthenticated$.subscribe((res) => {
      if (res) {
        this.router.navigateByUrl('main');
      }
    });
  }
}
