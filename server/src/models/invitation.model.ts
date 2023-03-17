export interface InvitationModel {
    id: string | null;
    from: string;
    name: string;
    to: string;
    status: string;
    project_id: string;
    project_name: string;
}