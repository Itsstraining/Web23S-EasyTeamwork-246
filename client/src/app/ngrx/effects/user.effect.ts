import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { switchMap } from "rxjs";
import { UserService } from "src/app/services/user.service";
import * as UserActions from '../action/user.action';

@Injectable()
export class UserEffect{
    constructor(private action$: Actions, private userService: UserService){}

    // login$ = createEffect(() =>{
    //     this.action$.pipe(
    //         ofType(UserActions.login),
    //         switchMap(() => this.userService.lo)
    //     )
    // })

    
}