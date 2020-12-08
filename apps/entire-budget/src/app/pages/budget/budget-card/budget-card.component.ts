import { Component, Input, OnInit } from '@angular/core';
import { BudgetGroup } from '../../../models';

@Component({
  selector: 'budget-card',
  templateUrl: './budget-card.component.html',
  styleUrls: ['./budget-card.component.scss'],
})
export class BudgetCardComponent {
  @Input() group: BudgetGroup;
  constructor() {
    console.log(this.group);
  }
}
