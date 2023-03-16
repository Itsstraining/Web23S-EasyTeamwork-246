import { UserModel } from "src/models/user.model";

export interface InvitationState {
  invitation: UserModel | null;
  inProcess: boolean;
  isLoading: boolean;
  error: string;
}
