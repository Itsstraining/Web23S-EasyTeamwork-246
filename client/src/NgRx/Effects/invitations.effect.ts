import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { switchMap, from, map, catchError, of } from "rxjs";
import { InvitationService } from "src/app/services/invitation/invitation.service";
import { InvitationActions } from "../Actions/invitations.action";


@Injectable()

export class InvitationEffect {
    constructor(private inviteService: InvitationService, private action: Actions) {}

    createInvitation$ = createEffect(() => this.action.pipe(
        ofType(InvitationActions.createInvitation),
        switchMap((action) => {
            return from(this.inviteService.send(action.invitation, action.idReceiver)).pipe(
                map((result:any) => {
                    return InvitationActions.createInvitationSuccess()
                }),
                catchError((error) => {
                    return of(InvitationActions.createInvitationFailure({error: error}))
                })
            )
        })
    ))

    getInvitations$ = createEffect(() => this.action.pipe(
        ofType(InvitationActions.getInvitations),
        switchMap((action) => {
            return from(this.inviteService.get(action.idReceiver)).pipe(
                map((result:any) => {
                    return InvitationActions.getInvitationSuccess({invitations: result})
                }),
                catchError((error) => {
                    return of(InvitationActions.getInvitationFailure({error: error}))
                })
            )
        })
    ))

    acceptInvitation$ = createEffect(() => this.action.pipe(
        ofType(InvitationActions.acceptInvitation),
        switchMap((action) => {
            return from(this.inviteService.accept(action.idProject, action.idReceiver, action.idInvitation, action.invitation)).pipe(
                map(() => {
                    return InvitationActions.acceptInvitationSuccess({idInvitation: action.idInvitation, invitation: action.invitation});
                }),
                catchError((error) => {
                    return of(InvitationActions.acceptInvitationFailure({error: error}))
                })
            )
        })
    ))

    declineInvitation$ = createEffect(() => this.action.pipe(
        ofType(InvitationActions.declineInvitation),
        switchMap((action) => {
            return from(this.inviteService.decline(action.idInvitation)).pipe(
                map(() => {
                    return InvitationActions.declineInvitationSuccess({idInvitation: action.idInvitation})
                }),
                catchError((error) => {
                    return of(InvitationActions.declineInvitationFailure({error: error}))
                })
            )
        })
    ))
}
