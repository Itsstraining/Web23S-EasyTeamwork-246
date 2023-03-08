import { TaskState } from "../States/tasks.state";
import * as TaskActions from '../Actions/tasks.action';
import { createReducer, on } from "@ngrx/store";


const initialState: TaskState = {
    tasks: [],
    loading: false,
    isSuccess: true,
    error: '',
}

export const TaskReducer = createReducer(
    initialState,
    on(TaskActions.getAllTasks, (state) => ({...state, loading: false})),
    on(TaskActions.getAllTasksSuccess, (state, action) => ({
        ...state,
        tasks: action.tasks,
        isSuccess: true,
        loading: false,
        error: "",
    })),
    on(TaskActions.getAllTasksFailure, (state, action) => ({
        ...state,
        tasks: [],
        loading: false,
        error: action.error,
    })),
);