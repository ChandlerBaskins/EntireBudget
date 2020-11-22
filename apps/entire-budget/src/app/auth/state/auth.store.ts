import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

export interface AuthenticatonState {
  key: string;
  email: string;
  email_verified: boolean;
  family_name: string;
  given_name: string;
  locale: string;
  name: string;
  nickname: string;
  picture: string;
  sub: string;
  updated_at: string;
}

export function createInitialState(): AuthenticatonState {
  return {
    key: '',
    email: '',
    email_verified: null,
    family_name: '',
    given_name: '',
    locale: '',
    name: '',
    nickname: '',
    picture: '',
    sub: '',
    updated_at: '',
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'auth' })
export class AuthenticatonStore extends Store<AuthenticatonState> {
  constructor() {
    super(createInitialState());
  }
}
