import { UserModel } from "./user.model";

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
}
