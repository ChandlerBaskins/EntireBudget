import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SharedModule } from './shared/shared.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { LandingComponent } from './pages/landing/landing.component';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { AkitaNgRouterStoreModule } from '@datorama/akita-ng-router-store';
import { environment } from '../environments/environment';
import { AuthModule } from '@auth0/auth0-angular';

@NgModule({
  declarations: [AppComponent, LandingComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    environment.production ? [] : AkitaNgDevtools.forRoot(),
    AkitaNgRouterStoreModule.forRoot(),
    AuthModule.forRoot({
      domain: 'entire-budget.us.auth0.com',
      clientId: 'doN3oTaX0xh9TDPA704sycRHe04tZxda',
      redirectUri:"http://localhost:4200/main"
    }),
    SharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
