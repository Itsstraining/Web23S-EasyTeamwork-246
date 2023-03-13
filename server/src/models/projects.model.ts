import { UserModel } from "./users.model";

export type Status = "in-progress" | "completed" | "overdue";

export interface ProjectModel {
    project_id: string;
    marked: boolean;
    name: string;
    owner: string;
    owner_photo: string;
    owner_id: string;
    due_date: string;
    status: Status;
    disable: boolean;
    members: UserModel[];

    is_in_progress: boolean;
    is_completed: boolean;
    is_overdue: boolean;
}