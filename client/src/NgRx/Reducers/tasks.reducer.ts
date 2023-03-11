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
        isSuccess: false,
        error: action.error,
    })),
    
    on(TaskActions.getById, (state) => ({...state, loading: false})),
    on(TaskActions.getByIdSuccess, (state, action) => ({
        ...state,
        tasks: [action.task],
        loading: false,
        isSuccess: true,
        error: "",
    })),
    on(TaskActions.getByIdFailure, (state, action) => ({
        ...state,
        tasks: [],
        loading: false,
        isSuccess: false,
        error: action.error,
    })),

    on(TaskActions.addTask, (state) => ({...state, loading: false})),
    on(TaskActions.addTaskSuccess, (state, action) => ({
        ...state,
        tasks: [...state.tasks, action.task],
        loading: false,
        isSuccess: true,
        error: "",
    })),
    on(TaskActions.addTaskFailure, (state, action) => ({
        ...state,
        tasks: [],
        loading: false,
        isSuccess: false,
        error: action.error,
    })),
    on(TaskActions.getTasksByProjectId, (state) => ({...state, loading: false})),
    on(TaskActions.getTasksByProjectIdSuccess, (state, action) => ({
        ...state,
        tasks: action.tasks,
        loading: false,
        isSuccess: true,
        error: "",
        })),
    on(TaskActions.getTasksByProjectIdFailure, (state, action) => ({
        ...state,
        tasks: [],
        loading: false,
        isSuccess: false,
        error: action.error,
    })),
);

