export interface InvitationModel {
  id: string;
  owner_id: string;
  receiver_id: string;
  status: number;
  project_id: string;
  unread: boolean;
}
