import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { switchMap, map, catchError, of, from } from "rxjs";
import { ProjectService } from "src/app/services/projects/project.service";
import { ProjectModel } from "src/models/projects.model";
import * as ProjectActions from '../Actions/projects.action';

@Injectable()
export class ProjectEffects{
    constructor(private $action: Actions, private projectService: ProjectService){}

    getAllProjects$ = createEffect(
        () => this.$action.pipe(
            ofType(ProjectActions.getAllProjects),
            switchMap(() => {
                return this.projectService.getAllProject();
            }),
            map((data) => {
                return ProjectActions.getAllProjectsSuccess({ projects: <Array<ProjectModel>>data });
            }),
            catchError((error) => {
                return of(ProjectActions.getAllProjectsFailure({error: error}))
            })
        )
    );

    getProjectById$ = createEffect(() => this.$action.pipe(
      ofType(ProjectActions.getByProjectId),
      switchMap((action) => {
          return from(this.projectService.getByProjectId(action.project_id).pipe(
              map((result:any) => {
                  return ProjectActions.getByProjectIdSuccess({project: result});
              }),
              catchError((error) => {
                  return of(ProjectActions.getByProjectIdFailure({error: error}))
              })
          ))
      })
  ))
}
