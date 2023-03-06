import { createReducer, on } from '@ngrx/store';
import * as UserActions from '../action/user.action';
import { UserState } from '../states/user.state';

const initialState: UserState = {
  users: [],
  user:null,
  loading: false,
  isSuccess: true,
  error: '',
};

export const userReducer = createReducer(
  initialState,
  on(UserActions.login, (state) => {
    return { 
      ...state, 
      loading: true, 
      isSuccess: true, 
      error: '',
    };
  }),
  on(UserActions.loginSuccess, (state,{user}) => {
    return {
      ...state,
      user: user,
      loading: false,
      isSuccess: false,
      error: '',
    };
  }),
  on(UserActions.loginFail, (state,{error}) => {
    return {
      ...state,
      user: null,
      loading: false,
      isSuccess: false,
      error: '',
    };
  }),
);
