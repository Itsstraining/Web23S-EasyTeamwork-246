import { UserModel } from "./user.model";

export type Status = "in-progress" | "completed" | "overdue";

export interface ProjectModel{
    project_id: string;
    marked: boolean;
    name: string;
    owner: string;
    due_date: Date;
    status: Status;
    disable: boolean;
    members: UserModel[];

    is_in_progress: boolean;
    is_completed: boolean;
    is_overdue: boolean;
}