import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainHomeComponent } from './main-home/main-home.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [MainHomeComponent],
  imports: [
    CommonModule,
    MainRoutingModule,
    SharedModule
  ]
})
export class MainModule { }
