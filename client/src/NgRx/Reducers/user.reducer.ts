import { createReducer, on } from '@ngrx/store';
import { UserModel } from 'src/models/user.model';
import * as UserActions from '../../NgRx/Actions/user.action';
import { UserState } from '../../NgRx/States/user.state';

const initialState: UserState = {
  users: [],
  user:null,
  isAuthenticated: false,
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
      isAuthenticated: true,
      loading: false,
      error: '',
    };
  }),
  on(UserActions.loginFail, (state,{error}) => {
    return {
      ...state,
      user: null,
      isAuthenticated: false,
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
  }),
  on(UserActions.getAllUsers, (state) => {
    return {
      ...state,
      inProcess: true,
      loading: true,
      error: '',
    };
  }),
  on(UserActions.getAllUsersSuccess, (state, { users }) => {
    return {
      ...state,
      users: users,
      inProcess: false,
      loading: false,
      error: '',
    };
  }),
  on(UserActions.getAllUsersFailure, (state, { error }) => {
    return {
      ...state,
      inProcess: false,
      loading: false,
      error,
    };
  })
);
