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

export const getById = createAction(
    "[Task] Get task by id",
    props<{ id: string }>()
);
export const getByIdSuccess = createAction(
    "[Task] Get task by id success",
    props<{ task: TaskModel }>()
);
export const getByIdFailure = createAction(
    "[Task] Get task by id failure",
    props<{ error: string }>()
);


export const addTask = createAction(
    "[Task] Add task",
    props<{ task: TaskModel }>()
);
export const addTaskSuccess = createAction(
    "[Task] Add task success",
    props<{ task: TaskModel }>()
);
export const addTaskFailure = createAction(
    "[Task] Add task failure",
    props<{ error: string }>()
);


export const updateTask = createAction(
    "[Task] Update task",
    props<{ task: TaskModel, id: string }>()
);
export const updateTaskSuccess = createAction(
    "[Task] Update task success",
    props<{ task: TaskModel }>()
);
export const updateTaskFailure = createAction(
    "[Task] Update task failure",
    props<{ error: string }>()
);

export const deleteTask = createAction(
    "[Task] Delete task",
    props<{ task_id: string }>()
);
export const deleteTaskSuccess = createAction(
    "[Task] Delete task success",
    props<{ task: TaskModel }>()
);
export const deleteTaskFailure = createAction(
    "[Task] Delete task failure",
    props<{ error: string }>()
);

export const getByProjectId = createAction(
    "[Task] Get task by project id",
    props<{ project_id: string }>()
);
export const getByProjectIdSuccess = createAction(
    "[Task] Get task by project id success",
    props<{ tasks: TaskModel[] }>()
);
export const getByProjectIdFailure = createAction(
    "[Task] Get task by project id failure",
    props<{ error: string }>()
);
