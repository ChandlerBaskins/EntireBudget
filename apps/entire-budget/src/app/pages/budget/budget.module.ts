import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { BudgetHomeComponent } from './budget-home/budget-home.component';
import { BudgetRoutingModule } from './budget-routing.module';
import { SummaryComponent } from './summary/summary.component';
import { BudgetListComponent } from './budget-list/budget-list.component';
import { BudgetCardComponent } from './budget-card/budget-card.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { LineItemComponent } from './line-item/line-item.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    BudgetHomeComponent,
    SummaryComponent,
    BudgetListComponent,
    BudgetCardComponent,
    LineItemComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    BudgetRoutingModule,
    NgxChartsModule,
    ReactiveFormsModule,
  ],
})
export class BudgetModule {}
