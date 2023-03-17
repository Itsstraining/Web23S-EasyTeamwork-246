import { InvitationModel } from "src/models/invitation.model";

export interface InvitationState {
  invitation: InvitationModel | null;
  invitations: InvitationModel[];
  loading: boolean;
  inProcess: boolean;
  error: string;
}
