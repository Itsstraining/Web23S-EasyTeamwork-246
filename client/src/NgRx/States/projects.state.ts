import { ProjectModel } from "src/models/projects.model";

export interface ProjectState {
  project: ProjectModel;
  projects: ProjectModel[];
  loading: boolean;
  isSuccess: boolean;
  error: string;
  isInvited: boolean;
  isAccepted: boolean;
  isRequested: boolean;
  requestProject: ProjectModel[];
}
