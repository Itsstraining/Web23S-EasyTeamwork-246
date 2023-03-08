import { createAction, props } from '@ngrx/store';
import { UserModel } from 'src/models/user.model';


export const login = createAction('[User] Login');
export const loginSuccess = createAction('[User] Login Success',props<{user:UserModel}>());
export const loginFail = createAction('[User] Login Fail',props<{error:string}>());

// export const logout = createAction('[User] Login');
// export const logoutSuccess = createAction('[User] Login Success',props<{user:UserModel}>());
// export const logoutFail = createAction('[User] Login Fail',props<{error:string}>());

// export const login = createAction('[User] Login');
// export const loginSuccess = createAction('[User] Login Success',props<{user:UserModel}>());
// export const loginFail = createAction('[User] Login Fail',props<{error:string}>());