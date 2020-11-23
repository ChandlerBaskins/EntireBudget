import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import {BudgetHomeComponent} from './budget-home/budget-home.component'
import {BudgetRoutingModule} from './budget-routing.module'


@NgModule({
  declarations: [BudgetHomeComponent],
  imports: [
    CommonModule,
    SharedModule,
    BudgetRoutingModule
  ]
})
export class BudgetModule { }
