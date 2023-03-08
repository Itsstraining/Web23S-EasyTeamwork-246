import { UserModel } from "./users.model";

export type Status = "in-progress" | "completed" | "overdue";

export interface ProjectModel {
    project_id: string;
    name: string;
    owner: string;
    due_date: Date;
    status: Status;
    disable: boolean;
    members: UserModel[];
}