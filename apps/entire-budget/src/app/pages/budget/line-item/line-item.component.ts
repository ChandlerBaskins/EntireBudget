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
  control: FormControl;
  ngOnChanges() {
    this.control = new FormControl(this.lineItem.name);
  }

  onUpdate(lineItem: LineItem, newItemName: string) {
    if (lineItem.name === newItemName) return;

    const updateLineItem = { ...lineItem, name: newItemName };
    const item: ActionCommand = { command: CRUD.UPDATE, item: updateLineItem };

    this.budgetService.onCommand(item);
  }
}
