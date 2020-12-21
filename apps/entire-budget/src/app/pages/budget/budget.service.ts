import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { merge, Subject, throwError } from 'rxjs';
import {
  catchError,
  distinctUntilChanged,
  map,
  scan,
  shareReplay,
  tap,
} from 'rxjs/operators';
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
  private budgetGroupSubject = new Subject<BudgetGroup>();
  budgetGroupAction$ = this.budgetGroupSubject.asObservable();

  crudLineItemGroups$ = merge(this.budgetGroups$, this.lineItemAction$).pipe(
    distinctUntilChanged(),
    scan((budgetGroup: BudgetGroup[], lineItem: LineItem) =>
      this.doCRUD(budgetGroup, lineItem)
    ),
    tap((val) => console.log('inpipe', val)),
    shareReplay(1)
  );

  //Support Methods

  onItemChange(newItem: LineItem) {
    this.lineItemSubject.next(newItem);
  }

  doCRUD(budgetGroup: BudgetGroup[], newLineItem: LineItem): BudgetGroup[] {
    return this.updateBudgetGroup(budgetGroup, newLineItem);
  }

  updateBudgetGroup(budgetGroup: BudgetGroup[], newLineItem: LineItem) {
    //find budget group that line item is being changed

    // create your new line item group

    //??CANDIDATE FOR REFACTOR
    if (newLineItem.action === CRUD.UPDATE) {
      const group = budgetGroup.find(
        (group) => group.id === newLineItem.budgetGroupId
      );
      //budget groups index
      const groupIDX = budgetGroup.indexOf(group);
      const newLineItemGroup = this.updateLineItemArr(group, newLineItem);
      const newGroup = { ...group, lineItems: newLineItemGroup } as BudgetGroup;

      const baseArr = budgetGroup.filter((g) => g.id !== group.id);
      //split the array and insert the new item
      const oneHalf = baseArr.slice(0, groupIDX);
      const otherPart = baseArr.slice(groupIDX, baseArr.length);
      return [...oneHalf, newGroup, ...otherPart];
    }
    if (newLineItem.action === CRUD.CREATE) {
      const group = budgetGroup.find(
        (group) => group.id === newLineItem.budgetGroupId
      );
      const newLineItemGroup = [...group.lineItems, newLineItem];
      //budget groups index
      const groupIDX = budgetGroup.indexOf(group);
      const newGroup = { ...group, lineItems: newLineItemGroup } as BudgetGroup;
      const baseArr = budgetGroup.filter((g) => g.id !== group.id);
      //split the array and insert the new item
      const oneHalf = baseArr.slice(0, groupIDX);
      const otherPart = baseArr.slice(groupIDX, baseArr.length);
      return [...oneHalf, newGroup, ...otherPart];
    }
  }

  updateLineItemArr(budgetGroup: BudgetGroup, newLineItem: LineItem) {
    // lineitem id
    const lineItem = budgetGroup.lineItems.find((i) => i.id === newLineItem.id);
    const lineItemIndex = budgetGroup.lineItems.indexOf(lineItem);

    // base line item array
    const lineItemBase = budgetGroup.lineItems.filter(
      (item) => item.id !== newLineItem.id
    );

    // split the array and insert new item
    const lineItemHalf = lineItemBase.slice(0, lineItemIndex);
    const lineItemOtherHalf = lineItemBase.slice(
      lineItemIndex,
      lineItemBase.length
    );

    return [...lineItemHalf, newLineItem, ...lineItemOtherHalf];
  }
}
