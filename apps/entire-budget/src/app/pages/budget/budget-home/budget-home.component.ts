import { Component } from '@angular/core';
import { tap } from 'rxjs/operators';
import { data } from '../../../data';

@Component({
  selector: 'main-home',
  templateUrl: './budget-home.component.html',
  styleUrls: ['./budget-home.component.scss'],
})
export class BudgetHomeComponent {
  data = data.pipe(tap(console.log));
}
