import { ProjectModel } from "src/models/projects.model";

export interface ProjectState{
    projects: ProjectModel[];
    loading: boolean;
    isSuccess: boolean;
    error: string;
}