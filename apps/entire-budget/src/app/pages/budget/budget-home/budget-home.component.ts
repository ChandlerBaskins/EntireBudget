import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Budget, BudgetGroup } from '../../../models';
import { BudgetService } from '../budget.service';

@Component({
  selector: 'main-home',
  templateUrl: './budget-home.component.html',
  styleUrls: ['./budget-home.component.scss'],
})
export class BudgetHomeComponent {
  budgetGroups$: Observable<BudgetGroup[]>;
  constructor(private budgetService: BudgetService) {
    this.budgetGroups$ = this.budgetService.budgetGroups$;
  }
}
