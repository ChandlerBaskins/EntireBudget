import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginHomeComponent } from './login-home/login-home.component';



@NgModule({
  declarations: [LoginHomeComponent],
  imports: [
    CommonModule
  ],
  exports:[LoginHomeComponent]
})
export class LoginModule { }
