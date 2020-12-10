import { Component, Input, OnChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { tap } from 'rxjs/operators';
import { LineItem } from '../../../models';
import { BudgetService, CRUD } from '../budget.service';

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
    const newItem = { ...lineItem, name: newItemName, action: CRUD.UPDATE };
    this.budgetService.onItemChange(newItem);
  }
}
