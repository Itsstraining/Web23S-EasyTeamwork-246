import { ProjectState } from "../States/projects.state";
import * as ProjectActions from '../Actions/projects.action';
import { createReducer, on } from "@ngrx/store";


const initialState: ProjectState = {
    projects: [],
    loading: false,
    isSuccess: true,
    error: '',
}

export const ProjectReducer = createReducer(
    initialState,
    on(ProjectActions.getAllProjects, (state) => ({...state, loading: false})),
    on(ProjectActions.getAllProjectsSuccess, (state, action) => ({
        ...state,
        projects: action.projects,
        isSuccess: true,
        loading: false,
        error: "",
    })),
    on(ProjectActions.getAllProjectsFailure, (state, action) => ({
        ...state,
        projects: [],
        loading: false,
        isSuccess: false,
        error: action.error,
    })),
);