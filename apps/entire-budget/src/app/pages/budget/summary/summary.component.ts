import { Component } from '@angular/core';
import { BudgetGroup } from '../../../models';
import { ActionCommand, BudgetService, CRUD } from '../budget.service';
@Component({
  selector: 'budget-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
})
export class SummaryComponent {
  constructor(private budgetService: BudgetService) {}
  single = [
    {
      name: 'Germany',
      value: 8940000,
    },
    {
      name: 'USA',
      value: 5000000,
    },
    {
      name: 'France',
      value: 7200000,
    },
    {
      name: 'UK',
      value: 6200000,
    },
  ];
  view = [400, 400];

  // options
  gradient = true;
  showLegend = true;
  showLabels = true;
  isDoughnut = false;
  legendPosition = 'below';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA'],
  };

  onAddNewGroup() {
    const newGroup: BudgetGroup = {
      budgetId: 'budgetNovember',
      groupName: 'new GRouup',
      groupPercentOfWhole: 0,
      groupTotal: 0,
      groupType: 'Expense',
      id: `${Math.floor(Math.random() * 100)}`,
      lineItems: [],
    };

    const command: ActionCommand = { item: newGroup, command: CRUD.CREATE };

    this.budgetService.onCommand(command);
  }
}
