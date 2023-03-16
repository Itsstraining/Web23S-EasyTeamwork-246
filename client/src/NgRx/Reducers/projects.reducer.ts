import { ProjectState } from "../States/projects.state";
import * as ProjectActions from '../Actions/projects.action';
import { createReducer, on } from "@ngrx/store";
import { ProjectModel } from "src/models/projects.model";


const initialState: ProjectState = {
  project: {} as ProjectModel,
  projects: [],
  loading: false,
  isSuccess: true,
  error: '',
  isAccepted: false,
  isInvited: false,
  isRequested: false,
  requestProject: [],
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


);
