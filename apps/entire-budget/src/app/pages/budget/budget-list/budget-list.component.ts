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
export class BudgetListComponent implements OnInit {
  budgetGroups$: Observable<BudgetGroup[]>;
  constructor(private budgetService: BudgetService) {
    this.budgetGroups$ = this.budgetService.budgetGroups$.pipe(
      tap(console.log)
    );
  }

  ngOnInit(): void {}
}
