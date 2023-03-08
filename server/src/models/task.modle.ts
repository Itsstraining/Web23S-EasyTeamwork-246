import { UserModel } from "./users.model";

export type Status = 'todo' | 'in-progress' | 'completed' | 'due'
export type Complexity = 'easy' | 'medium' | 'hard'

export interface TaskModel{
    task_id: string;
    project_id: string;
    assignee: UserModel[];
    name: string;
    description: string;
    status: Status;
    complexity: Complexity;
    deadline: string;
    comment_count: number;
    created_at: string;
    updated_at: string;
}