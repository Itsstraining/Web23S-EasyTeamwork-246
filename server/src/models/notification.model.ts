export interface NotificationModel {
    id: string;
    owner_id: string;
    receiver_id: string;
    invitation_id: string;
    status: number;
    unread: boolean;
  }
  