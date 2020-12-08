import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
@Component({
  selector: 'entire-budget-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {
  sub: Subscription;
  constructor(public auth: AuthService, private router: Router) {
    this.auth.isAuthenticated$.pipe(tap(console.log));
    this.sub = this.auth.isAuthenticated$.subscribe((res) => {
      if (res) {
        this.router.navigateByUrl('budget');
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
