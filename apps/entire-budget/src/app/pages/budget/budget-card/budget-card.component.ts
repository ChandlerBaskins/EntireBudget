import { Component, Input, Output, EventEmitter } from '@angular/core';
import { BudgetGroup, LineItem } from '../../../models';
import { CRUD } from '../budget.service';

@Component({
  selector: 'budget-card',
  templateUrl: './budget-card.component.html',
  styleUrls: ['./budget-card.component.scss'],
})
export class BudgetCardComponent {
  @Input() group: BudgetGroup;
  @Output() additem = new EventEmitter<LineItem>();

  additemClick() {
    const newLineItem: LineItem = {
      budgetGroupId: this.group.id,
      budgetedAmount: 0,
      dueDate: '',
      id: `${Math.floor(Math.random() * 100)}`,
      transactions: [],
      groupName: this.group.groupName,
      planned: 0,
      action: CRUD.CREATE,
      name: this.group.groupName,
      category: this.group.groupType,
    };
    this.additem.emit(newLineItem);
  }
}
