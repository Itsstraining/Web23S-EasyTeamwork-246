import { createAction, props } from "@ngrx/store";
import { ProjectModel } from "src/models/projects.model";

// Get All Projects
export const getAllProjects = createAction(
    "[Project] Get all projects"
);
export const getAllProjectsSuccess = createAction(
    "[Project] Get all projects success",
    props<{ projects: ProjectModel[] }>()
);
export const getAllProjectsFailure = createAction(
    "[Project] Get all projects failure",
    props<{ error: string }>()
);

export const  getProjectById = createAction('[Project] Get Project', props<{ project_id: string }>());
export const  getProjectByIdSuccess = createAction('[Project] Get Project Success', props<{ project: ProjectModel }>());
export const  getProjectByIdFailure = createAction('[Project] Get Project Failure', props<{ error: string }>());
