import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { UserService } from 'src/app/services/users/user.service';
import * as UserActions from '../../NgRx/Actions/user.action';
@Injectable()
export class UserEffect {
  constructor(private action$: Actions, private userService: UserService) {}

  login$ = createEffect(() =>
    this.action$.pipe(
      ofType(UserActions.login),
      switchMap(() => this.userService.loginWithGoogle()),
      map((user) => {
        return UserActions.loginSuccess({ user: user });
      }),
      catchError((error) => of(UserActions.loginFail({ error: error })))
    )
  );

  logout$ = createEffect(() =>
    this.action$.pipe(
      ofType(UserActions.logout),
      switchMap(() => this.userService.logoutWithGoogle()),
      map(() => {
        return UserActions.logoutSuccess();
      }),
      catchError((error) => of(UserActions.logoutFail({ error: error })))
    )
  );
}
