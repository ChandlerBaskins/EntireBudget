import { Component, Input, OnChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { tap } from 'rxjs/operators';
import { LineItem } from '../../../models';

@Component({
  selector: 'line-item',
  templateUrl: './line-item.component.html',
  styleUrls: ['./line-item.component.scss'],
})
export class LineItemComponent implements OnChanges {
  @Input() lineItem: LineItem;
  control: FormControl;
  ngOnChanges() {
    this.control = new FormControl(this.lineItem.name, []);
    this.control.valueChanges.pipe(tap(console.log)).subscribe();
  }
}
