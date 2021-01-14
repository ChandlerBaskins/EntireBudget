import { Component, Input, OnChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActionOrActionWithState } from '@nrwl/angular/src/runtime/nx/data-persistence';
import { tap } from 'rxjs/operators';
import { LineItem } from '../../../models';
import { ActionCommand, BudgetService, CRUD } from '../budget.service';

@Component({
  selector: 'line-item',
  templateUrl: './line-item.component.html',
  styleUrls: ['./line-item.component.scss'],
})
export class LineItemComponent implements OnChanges {
  constructor(private budgetService: BudgetService) {}
  @Input() lineItem: LineItem;
  lineItemName: FormControl;
  lineItemBudgeted: FormControl;
  ngOnChanges() {
    this.lineItemName = new FormControl(this.lineItem.name);
    this.lineItemBudgeted = new FormControl(this.lineItem.budgetedAmount);
  }

  onUpdateName(lineItem: LineItem, newItemName: string) {
    this.budgetService.selectedLineItem(null);
    if (lineItem.name === newItemName) return;

    const updatedLineItem = { ...lineItem, name: newItemName };
    const item: ActionCommand = { command: CRUD.UPDATE, item: updatedLineItem };

    this.budgetService.onCommand(item);
  }

  onClick(event) {
    event.target.select();
    this.budgetService.selectedLineItem(this.lineItem);
  }

  onRemove() {
    const item: ActionCommand = { command: CRUD.DELETE, item: this.lineItem };
    this.budgetService.onCommand(item);
  }

  onBlur(lineItemProperty: string, newItemValue: string) {
    this.budgetService.selectedLineItem(null);
    if (this.lineItem[lineItemProperty] == newItemValue) return;
    const itemValue = Number(newItemValue);
    const updatedLineItem = { ...this.lineItem, [lineItemProperty]: itemValue };
    const item: ActionCommand = { command: CRUD.UPDATE, item: updatedLineItem };
    this.budgetService.onCommand(item);
  }
}
