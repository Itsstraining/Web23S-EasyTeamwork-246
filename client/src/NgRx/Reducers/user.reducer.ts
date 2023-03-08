import { createReducer, on } from '@ngrx/store';
import * as UserActions from '../Actions/user.action';
import { UserState } from '../States/user.state';

const initialState: UserState = {
  users: [],
  user:null,
  loading: false,
  error: '',
};

export const userReducer = createReducer(
  initialState,
  on(UserActions.login, (state) => {
    return { 
      ...state, 
      loading: true, 
      error: '',
    };
  }),
  on(UserActions.loginSuccess, (state,{user}) => {
    return {
      ...state,
      user: user,
      loading: false,
      error: '',
    };
  }),
  on(UserActions.loginFail, (state,{error}) => {
    return {
      ...state,
      user: null,
      loading: false,
      error: '',
    };
  }),
);
