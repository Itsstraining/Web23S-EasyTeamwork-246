import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProjectService } from "src/app/services/projects/project.service";
import { InvitationActions } from "../Actions/invitations.action";
import { catchError, map, of, switchMap, pipe, from } from 'rxjs';

@Injectable()
export class InvitationEffects {
  constructor(
    private actions$: Actions,
    private projectService: ProjectService
  ) { }


  $getAllForUser = createEffect(() =>
    this.actions$.pipe(
      ofType(InvitationActions.getAllForUser),
      switchMap((action) =>
        this.projectService.getAllByUserId(action._id).pipe(
          map((projects) => {
            if (projects == null) {
              return InvitationActions.getAllForUserSuccess({ projects: [] })
            }
            else {
              return InvitationActions.getAllForUserSuccess({
                projects: projects
              })
            }
          }),
          catchError((error) => (
            of(InvitationActions.getAllForUserFail({ error: error }))
          )
          )
        )
      )
    )
  );

  $inviteProject = createEffect(() =>
    this.actions$.pipe(
      ofType(InvitationActions.inviteProject),
      switchMap((action) =>
        this.projectService.invite(action.email, action.project)
      ),
      map((project) => {
        if (project._id) {
          return InvitationActions.inviteProjectSuccess({ proj: project });
        } else {
          return InvitationActions.inviteProjectFail({
            error: 'Project not found',
          });
        }
      }),
      catchError((error: string) => {
        console.log('error', error);
        return from([InvitationActions.inviteProjectFail({ error })]);
      })
    )
  );

  acceptRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InvitationActions.acceptRequest),
      switchMap((action) =>
        this.projectService.acceptRequest(action._id, action.project)
      ),
      map((project) => {
        if (project._id) {
          return InvitationActions.acceptRequestSuccess({ project: project });
        } else {
          return InvitationActions.acceptRequestFail({
            error: 'Project not found',
          });
        }
      }),
      catchError((error: string) =>
        from([InvitationActions.acceptRequestFail({ error })])
      )
    )
  );

  getRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InvitationActions.findRequest),
      switchMap((action) => this.projectService.findRequestList(action._id)),
      map((projects) => {
        if (projects && projects.length > 0) {
          return InvitationActions.findRequestSuccess({ projects });
        } else {
          return InvitationActions.findRequestSuccess({ projects: [] });
        }
      }),
      catchError((error: string) =>
        from([InvitationActions.findRequestFail({ error })])
      )
    )
  );
}
