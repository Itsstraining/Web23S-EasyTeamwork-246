import { ProjectState } from "../States/projects.state";
import * as ProjectActions from '../Actions/projects.action';
import { createReducer, on } from "@ngrx/store";
import { ProjectModel } from "src/models/projects.model";


const initialState: ProjectState = {
  project: null,
  projects: [],
  loading: false,
  isSuccess: true,
  error: '',
}

export const ProjectReducer = createReducer(
  initialState,
  on(ProjectActions.getAllProjects, (state) => ({ ...state, loading: true })),
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
  on(ProjectActions.getProjectById, (state, { project_id }) => {
    return {
      ...state,
      inProcess: true,
      loading: true,
      error: '',
    };
  }),
  on(ProjectActions.getProjectByIdSuccess, (state, { project }) => {
    return {
      ...state,
      project: project,
      inProcess: false,
      loading: false,
      error: '',
    };
  }),
  on(ProjectActions.getProjectByIdFailure, (state, { error }) => {
    return {
      ...state,
      inProcess: false,
      loading: false,
      error: error,
    };
  }),
);
