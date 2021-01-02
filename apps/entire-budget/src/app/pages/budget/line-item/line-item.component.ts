import { Component, Input, OnChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
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
  lineItemPaid: FormControl;
  ngOnChanges() {
    this.lineItemName = new FormControl(this.lineItem.name);
    this.lineItemBudgeted = new FormControl(this.lineItem.budgetedAmount);
    this.lineItemPaid = new FormControl(this.lineItem.planned);
  }

  onUpdateName(lineItem: LineItem, newItemName: string) {
    if (lineItem.name === newItemName) return;

    const updatedLineItem = { ...lineItem, name: newItemName };
    const item: ActionCommand = { command: CRUD.UPDATE, item: updatedLineItem };

    this.budgetService.onCommand(item);
  }

  onUpdateNumbers(lineItemProperty: string, newItemValue: string) {
    if (this.lineItem[lineItemProperty] == newItemValue) return;
    console.log(lineItemProperty);
    const itemValue = Number(newItemValue);
    const updatedLineItem = { ...this.lineItem, [lineItemProperty]: itemValue };
    const item: ActionCommand = { command: CRUD.UPDATE, item: updatedLineItem };
    this.budgetService.onCommand(item);
  }
}
