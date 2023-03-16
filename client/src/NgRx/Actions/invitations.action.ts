import { createAction, props } from "@ngrx/store";
import { ProjectModel } from "src/models/projects.model";

export const InvitationActions = {
  getAllForUser: createAction(
    '[Project] Get All For User',
    props<{ _id: string }>()
  ),
  getAllForUserSuccess: createAction(
    '[Project] Get All For User Success',
    props<{ projects: ProjectModel[] }>()
  ),
  getAllForUserFail: createAction(
    '[Project] Get All For User Fail',
    props<{ error: string }>()
  ),

  inviteProject: createAction(
    '[Project] Invite',
    props<{ project: ProjectModel; email: string }>()
  ),
  inviteProjectSuccess: createAction(
    '[Project] Invite Success',
    props<{ proj: ProjectModel }>()
  ),
  inviteProjectFail: createAction(
    '[Project] Invite Fail',
    props<{ error: string }>()
  ),
  //find request
  findRequest: createAction('[Project] Find Request', props<{ _id: string }>()),
  findRequestSuccess: createAction(
    '[Project] Find Request Success',
    props<{ projects: ProjectModel[] }>()
  ),

  findRequestFail: createAction(
    '[Project] Find Request Fail',
    props<{ error: string }>()
  ),
  //accept request
  acceptRequest: createAction(
    '[Project] Accept Request',
    props<{ project: ProjectModel; _id: string }>()
  ),
  acceptRequestSuccess: createAction(
    '[Project] Accept Request Success',
    props<{ project: ProjectModel }>()
  ),
  acceptRequestFail: createAction(
    '[Project] Accept Request Fail',
    props<{ error: string }>()
  ),
};
