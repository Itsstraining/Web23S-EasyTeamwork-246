import { createAction, props } from "@ngrx/store";
import { TaskModel } from "src/models/task.model";

export const getAllTasks = createAction(
    "[Task] Get all tasks"
);

export const getAllTasksSuccess = createAction(
    "[Task] Get all tasks success",
    props<{ tasks: TaskModel[] }>()
);

export const getAllTasksFailure = createAction(
    "[Task] Get all tasks failure",
    props<{ error: string }>()
);