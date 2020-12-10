import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  merge,
  Subject,
  throwError,
} from 'rxjs';
import { catchError, map, scan, shareReplay, tap } from 'rxjs/operators';
import { Budget, BudgetGroup, LineItem } from '../../models';
export enum CRUD {
  CREATE,
  UPDATE,
  DELETE,
}
@Injectable({
  providedIn: 'root',
})
export class BudgetService {
  constructor(private http: HttpClient) {}
  budget$ = this.http.get<Budget>('assets/data.json').pipe(
    catchError((err) => {
      console.error(err);
      return throwError(err);
    }),
    shareReplay(1)
  );
  budgetGroups$ = this.budget$.pipe(map((budget) => budget.groups));

  private lineItemSubject = new Subject<LineItem>();
  lineItemAction$ = this.lineItemSubject.asObservable();

  crudBudgetGroups$ = merge(this.budgetGroups$, this.lineItemAction$).pipe(
    scan((budgetGroup: BudgetGroup[], lineItem: LineItem) =>
      this.doCRUD(budgetGroup, lineItem)
    ),
    tap((val) => console.log('inpipe', val)),
    shareReplay(1)
  );

  onItemChange(newItem: LineItem) {
    this.lineItemSubject.next(newItem);
  }

  onUpdate(budgetGroup, newLineItem) {
    return this.insertArrayItem(budgetGroup, newLineItem);
  }

  doCRUD(budgetGroup: BudgetGroup[], newLineItem: LineItem): BudgetGroup[] {
    if (newLineItem.action === CRUD.UPDATE) {
      return this.onUpdate(budgetGroup, newLineItem);
    }

    return budgetGroup;
  }

  insertArrayItem(budgetGroup, newLineItem) {
    //find budget group that line item is being changed
    const group = budgetGroup.find(
      (group) => group.id === newLineItem.budgetGroupId
    );
    //budget groups id
    const groupIDX = budgetGroup.indexOf(group);
    // create your new line item group
    const newLineItemGroup = [
      newLineItem,
      ...group.lineItems.filter((item) => item.id !== newLineItem.id),
    ];
    //create your new group
    const newGroup = { ...group, lineItems: newLineItemGroup } as BudgetGroup;

    const baseArr = budgetGroup.filter((g) => g.id !== group.id);
    //split the array and insert the new item
    const oneHalf = baseArr.slice(0, groupIDX);
    const otherPart = baseArr.slice(groupIDX, baseArr.length);
    return [...oneHalf, newGroup, ...otherPart];
  }
}
