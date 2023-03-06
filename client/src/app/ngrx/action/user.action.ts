import { createAction, props } from '@ngrx/store';
import { UserModel } from 'src/app/models/user.model';

export const login = createAction('[User] Login');
export const loginSuccess = createAction('[User] Login Success',props<{user:UserModel}>());
export const loginFail = createAction('[User] Login Fail',props<{error:string}>());