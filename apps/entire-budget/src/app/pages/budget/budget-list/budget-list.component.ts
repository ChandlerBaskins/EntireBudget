import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { BudgetGroup, LineItem } from '../../../models';
import { ActionCommand, BudgetService, CRUD } from '../budget.service';

@Component({
  selector: 'budget-list',
  templateUrl: './budget-list.component.html',
  styleUrls: ['./budget-list.component.scss'],
})
export class BudgetListComponent {
  budgetGroups$: Observable<BudgetGroup[]>;
  constructor(private budgetService: BudgetService) {
    this.budgetGroups$ = this.budgetService.crudLineItemGroups$;
  }

  onAddItem(newLineItem: LineItem) {
    const item: ActionCommand = { item: newLineItem, command: CRUD.CREATE };
    this.budgetService.onCommand(item);
  }

  onBudgetNameChange(budget: BudgetGroup) {
    const item: ActionCommand = { item: budget, command: CRUD.UPDATE };
    this.budgetService.onCommand(item);
  }
}
