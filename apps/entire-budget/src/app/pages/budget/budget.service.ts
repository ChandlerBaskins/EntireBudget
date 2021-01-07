import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { combineLatest, merge, Subject, throwError } from 'rxjs';
import {
  catchError,
  distinctUntilChanged,
  map,
  scan,
  shareReplay,
  tap,
} from 'rxjs/operators';
import { Budget, BudgetGroup, LineItem } from '../../models';
import { isLineItem } from '../../shared/isLineItemGuard';

export enum CRUD {
  CREATE,
  UPDATE,
  DELETE,
}

export interface ActionCommand {
  item: LineItem | BudgetGroup;
  command: CRUD;
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

  private actionSubject = new Subject<ActionCommand>();
  actionCommand$ = this.actionSubject.asObservable();

  crudBudgetGroups$ = merge(this.budgetGroups$, this.actionCommand$).pipe(
    distinctUntilChanged(),
    scan((budgetGroup: BudgetGroup[], action: ActionCommand) =>
      this.doCRUD(budgetGroup, action)
    ),
    tap((v) => console.log('THe final VALue', v)),
    shareReplay(1)
  );
  private selectedLineItemAction = new Subject<LineItem>();

  selectedLineItem$ = combineLatest([
    this.crudBudgetGroups$,
    this.selectedLineItemAction,
  ]).pipe(
    map(([budgetGroup, selectedItem]) => {
      if (!selectedItem) return null;
      //is this really neccessary
      const selectedGroup = budgetGroup.find(
        (group) => group.id === selectedItem.budgetGroupId
      );
      const selectedLineItem = selectedGroup.lineItems.find(
        (li) => li.id === selectedItem.id
      );
      return selectedLineItem;
    }),
    distinctUntilChanged(),
    shareReplay(),
    tap(console.log)
  );

  //Support Methods

  onCommand(item: ActionCommand) {
    this.actionSubject.next(item);
  }

  selectedLineItem(selectedLineItem: LineItem) {
    this.selectedLineItemAction.next(selectedLineItem);
  }

  doCRUD(budgetGroup: BudgetGroup[], action: ActionCommand): BudgetGroup[] {
    if (action.command === CRUD.UPDATE && isLineItem(action.item)) {
      return this.updateLineItem(budgetGroup, action.item);
    }
    if (action.command === CRUD.CREATE && isLineItem(action.item)) {
      return this.createNewLineItem(budgetGroup, action.item);
    }
    if (action.command === CRUD.CREATE && !isLineItem(action.item)) {
      return this.createNewBudgetGroup(budgetGroup, action.item);
    }
    if (action.command === CRUD.UPDATE && !isLineItem(action.item)) {
      return this.updateBudget(budgetGroup, action.item);
    }
  }

  updateLineItem(budgetGroup: BudgetGroup[], newLineItem: LineItem) {
    //find budget group that line item is being changed

    // create your new line item group

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

  createNewLineItem(budgetGroup: BudgetGroup[], newLineItem: LineItem) {
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

  createNewBudgetGroup(
    budgetGroup: BudgetGroup[],
    newBudgetGroup: BudgetGroup
  ) {
    return [...budgetGroup, newBudgetGroup];
  }

  updateBudget(budgetGroup: BudgetGroup[], budget: BudgetGroup) {
    const group = budgetGroup.find((group) => group.id === budget.id);
    //budget groups index
    const groupIDX = budgetGroup.indexOf(group);
    const newGroup = { ...budget, groupName: budget.newName };
    const baseArr = budgetGroup.filter((g) => g.id !== group.id);
    //split the array and insert the new item
    const oneHalf = baseArr.slice(0, groupIDX);
    const otherPart = baseArr.slice(groupIDX, baseArr.length);
    return [...oneHalf, newGroup, ...otherPart];
  }
}
