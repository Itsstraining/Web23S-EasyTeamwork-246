import { createAction, props } from "@ngrx/store";
import { InvitationModel } from "src/models/invitation.model";

export const InvitationActions = {
  createInvitation: createAction('[Invitation] Send Invitation', props<{ invitation: InvitationModel, idReceiver: string }>()),
  createInvitationSuccess: createAction('[Invitation] Send Invitation Success'),
  createInvitationFailure: createAction('[Invitation] Send Invitation Failure', props<{ error: string }>()),

  getInvitations: createAction('[Invitation] Get Invitations', props<{ idReceiver: string }>()),
  getInvitationSuccess: createAction('[Invitation] Get Invitations Success', props<{ invitations: InvitationModel[] }>()),
  getInvitationFailure: createAction('[Invitation] Get Invitations Failure', props<{ error: string }>()),

  acceptInvitation: createAction('[Invitation] Accept Invitation', props<{ idProject: string, idReceiver: string, idInvitation: string, invitation: InvitationModel }>()),
  acceptInvitationSuccess: createAction('[Invitation] Accept Invitation Success', props<{ idInvitation: string, invitation: InvitationModel }>()),
  acceptInvitationFailure: createAction('[Invitation] Accept Invitation Failure', props<{ error: string }>()),

  declineInvitation: createAction('[Invitation] Reject Invitation', props<{ idInvitation: string }>()),
  declineInvitationSuccess: createAction('[Invitation] Reject Invitation Success', props<{ idInvitation: string }>()),
  declineInvitationFailure: createAction('[Invitation] Reject Invitation Failure', props<{ error: string }>()),
}
