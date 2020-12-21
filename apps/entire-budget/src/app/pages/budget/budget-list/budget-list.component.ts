import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { BudgetGroup, LineItem } from '../../../models';
import { BudgetService } from '../budget.service';

@Component({
  selector: 'budget-list',
  templateUrl: './budget-list.component.html',
  styleUrls: ['./budget-list.component.scss'],
})
export class BudgetListComponent {
  budgetGroups$: Observable<BudgetGroup[]>;
  constructor(private budgetService: BudgetService) {
    this.budgetGroups$ = this.budgetService.crudBudgetGroups$;
  }

  onAddItem(newLineItem: LineItem) {
    this.budgetService.onItemChange(newLineItem);
  }
}
