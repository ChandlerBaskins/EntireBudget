import { Component, Input, OnInit } from '@angular/core';
import { LineItem } from '../../../models';

@Component({
  selector: 'line-item',
  templateUrl: './line-item.component.html',
  styleUrls: ['./line-item.component.scss'],
})
export class LineItemComponent {
  @Input() lineItem: LineItem;
}
