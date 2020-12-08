import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, map, shareReplay } from 'rxjs/operators';
import { Budget } from '../../models';

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
}
