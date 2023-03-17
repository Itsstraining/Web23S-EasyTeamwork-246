import { ProjectModel } from "src/models/projects.model";

export interface ProjectState {
  project: ProjectModel | null;
  projects: ProjectModel[];
  loading: boolean;
  isSuccess: boolean;
  error: string;
}
