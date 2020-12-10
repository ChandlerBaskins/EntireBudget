import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { BudgetGroup } from '../../../models';
import { BudgetService } from '../budget.service';

@Component({
  selector: 'budget-list',
  templateUrl: './budget-list.component.html',
  styleUrls: ['./budget-list.component.scss'],
})
export class BudgetListComponent {
  budgetGroups$: Observable<BudgetGroup[]>;
  test$;
  constructor(private budgetService: BudgetService) {
    this.budgetGroups$ = this.budgetService.crudBudgetGroups$;
    // this.test$ = this.budgetService.crudBudgetGroups$;
    // this.test$.subscribe();
  }
}
