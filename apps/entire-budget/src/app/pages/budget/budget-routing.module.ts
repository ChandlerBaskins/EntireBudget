import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BudgetHomeComponent } from './budget-home/budget-home.component';

const routes: Routes = [{ path: '', component: BudgetHomeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BudgetRoutingModule {}
