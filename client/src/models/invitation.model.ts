export interface InvitationModel {
  _id: string;
  project_id: string;
  email: string;
  createdAt: number;
  updatedAt: number;
  status: number;
  unread: boolean;
}
