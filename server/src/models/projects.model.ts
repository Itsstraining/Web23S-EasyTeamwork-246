import { UserModel } from "./users.model";

export interface ProjectModel {
    project_id: string;
    name: string;
    owner: string;
    disanle: boolean;
    members: UserModel[];
}