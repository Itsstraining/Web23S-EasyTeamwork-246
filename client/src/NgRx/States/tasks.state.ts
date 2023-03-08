import { TaskModel } from "src/models/todo.model";

export interface TaskState{
    tasks: TaskModel[];
    loading: boolean;
    isSuccess: boolean;
    error: string;
}