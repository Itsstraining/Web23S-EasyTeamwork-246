import { ProjectModel } from "src/models/projects.model";
import { ProjectState } from "../States/projects.state";
import { InvitationActions } from "../Actions/invitations.action";
import { createReducer, on } from '@ngrx/store';

const initialState: ProjectState = {
  project: {} as ProjectModel,
  projects: [],
  loading: false,
  isSuccess: true,
  error: '',
  isAccepted: false,
  isInvited: false,
  isRequested: false,
  requestProject: [],
}

export const InvitationReducer = createReducer(
  initialState,
  on(InvitationActions.inviteProject, (state, { type }) => {
    console.log(type);
    return {
      ...state,
      isInvited: false,
      error: '',
    };
  }),
  on(InvitationActions.inviteProjectSuccess, (state, { type }) => {
    console.log(type);
    return {
      ...state,
      isInvited: true,
    };
  }),
  on(InvitationActions.inviteProjectFail, (state, { error, type }) => {
    console.log(type);
    return {
      ...state,
      isInvited: false,
      error: error,
    };
  }),
  on(InvitationActions.acceptRequest, (state, { type }) => {
    console.log(type);
    return {
      ...state,
      isAccepted: false,
      error: '',
    };
  }),
  on(InvitationActions.acceptRequestSuccess, (state, { project, type }) => {
    console.log(type);
    return {
      ...state,
      isAccepted: true,
    };
  }),
  on(InvitationActions.acceptRequestFail, (state, { error, type }) => {
    console.log(type);
    return {
      ...state,
      isAccepted: false,
      error: error,
    };
  }),
  on(InvitationActions.findRequest, (state, { type }) => {
    console.log(type);
    return {
      ...state,
      isRequested: false,
      error: '',
    };
  }),
  on(InvitationActions.findRequestSuccess, (state, { projects, type }) => {
    console.log(type);
    return {
      ...state,
      isRequested: true,
      requestProject: projects,
    };
  }),
  on(InvitationActions.findRequestFail, (state, { error, type }) => {
    console.log(type);
    return {
      ...state,
      isRequested: false,
      error: error,
    };
  }),
);
