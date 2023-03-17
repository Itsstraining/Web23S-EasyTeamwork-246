import { InvitationActions } from "../Actions/invitations.action";
import { createReducer, on } from '@ngrx/store';
import { InvitationState } from "../States/invitations.state";

const initialState: InvitationState = {
  invitation: null,
  invitations: [],
  loading: false,
  inProcess: false,
  error: '',
}

export const InvitationReducer = createReducer(
  initialState,

  on(InvitationActions.createInvitation, (state) => {
      return {
          ...state,
          inProcess: true,
          loading: true,
          error: '',
      };
  }),
  on(InvitationActions.createInvitationSuccess, (state) => {
      return {
          ...state,
          inProcess: false,
          loading: false,
          error: '',
      };
  }),
  on(InvitationActions.createInvitationFailure, (state, { error }) => {
      return {
          ...state,
          inProcess: false,
          loading: false,
          error: error,
      };
  }),

  on(InvitationActions.getInvitations, (state,{idReceiver: idReciever}) => {
      return {
          ...state,
          inProcess: true,
          loading: true,
          error: '',
      };
  }),
  on(InvitationActions.getInvitationSuccess, (state, { invitations }) => {
      return {
          ...state,
          invitations: invitations,
          inProcess: false,
          loading: false,
          error: '',
      };
  }),
  on(InvitationActions.getInvitationFailure, (state, { error }) => {
      return {
          ...state,
          inProcess: false,
          loading: false,
          error: error,
      };
  }),

  on(InvitationActions.acceptInvitation, (state) => {
      return {
          ...state,
          inProcess: true,
          loading: true,
          error: '',
      };
  }),
  on(InvitationActions.acceptInvitationSuccess, (state,{idInvitation,invitation}) => {
      let newInvitations = [...state.invitations]
      let index = newInvitations.findIndex((invitation:any) => invitation.id == idInvitation);
      newInvitations[index] = {...invitation};
      newInvitations = [...newInvitations]
      if(index != -1){
        newInvitations[index] = {...newInvitations[index], status: 'accepted'};
      }
      return {
          ...state,
          invitations: newInvitations,
          inProcess: false,
          loading: false,
          error: '',
      };
  }),
  on(InvitationActions.acceptInvitationFailure, (state, { error }) => {
      return {
          ...state,
          inProcess: false,
          loading: false,
          error: error,
      };
  }),

  on(InvitationActions.declineInvitation, (state) => {
      
      return {
          ...state,
          inProcess: true,
          loading: true,
          error: '',
      };
  }),
  on(InvitationActions.declineInvitationSuccess, (state,{idInvitation}) => {
      let newInvitations = [...state.invitations]
      let index = newInvitations.findIndex((invitation:any) => invitation.id == idInvitation);
      if(index != -1){
          newInvitations[index] = {...newInvitations[index], status: 'rejected'};
      }
      return {
          ...state,
          invitations: newInvitations,
          inProcess: false,
          loading: false,
          error: '',
      };
  }),
  on(InvitationActions.declineInvitationFailure, (state, { error }) => {
      return {
          ...state,
          inProcess: false,
          loading: false,
          error:error,
      };
  })
)
