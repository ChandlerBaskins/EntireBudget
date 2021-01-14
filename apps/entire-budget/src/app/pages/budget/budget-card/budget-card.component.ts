import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { BudgetGroup, LineItem } from '../../../models';
import { ActionCommand, CRUD } from '../budget.service';

@Component({
  selector: 'budget-card',
  templateUrl: './budget-card.component.html',
  styleUrls: ['./budget-card.component.scss'],
})
export class BudgetCardComponent implements OnChanges {
  @Input() group: BudgetGroup;
  @Output() additem = new EventEmitter<LineItem>();
  @Output() changeBudgetName = new EventEmitter<BudgetGroup>();
  control: FormControl;

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

  onUpdate(group: BudgetGroup, name: string) {
    if (group.groupName === name) return;
    const budget = { ...group, newName: name };
    this.changeBudgetName.emit(budget);
  }

  ngOnChanges() {
    console.log(this.group.groupName);
    this.control = new FormControl(this.group.groupName);
  }
}
