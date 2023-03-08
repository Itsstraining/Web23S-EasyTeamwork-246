import { TaskModel } from "src/models/task.model";

export interface TaskState{
    tasks: TaskModel[];
    loading: boolean;
    isSuccess: boolean;
    error: string;
}