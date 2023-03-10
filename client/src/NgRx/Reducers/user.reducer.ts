import { createReducer, on } from '@ngrx/store';
import * as UserActions from '../../Ngrx/Actions/user.action';
import { UserState } from '../../Ngrx/States/user.state';

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
  on(UserActions.logout, (state) => {
    return {
      ...state,
      loading: true,
      error: '',
    };
  }),
  on(UserActions.logoutSuccess, (state) => {
    return {
      ...state,
      loading: false,
      error: '',
    };
  }),
  on(UserActions.logoutFail, (state,{error}) => {
    return {
      ...state,
      loading: false,
      error: '',
    };
  })
);
