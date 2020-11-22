import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { AuthenticatonStore, AuthenticatonState } from './auth.store';

@Injectable({ providedIn: 'root' })
export class AuthQuery extends Query<AuthenticatonState> {

  constructor(protected store: AuthenticatonStore) {
    super(store);
  }

}
