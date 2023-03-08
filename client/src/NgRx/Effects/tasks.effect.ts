import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { switchMap, map, catchError, of } from "rxjs";
import { TaskService } from "src/app/services/tasks/task.service";
import { TaskModel } from "src/models/task.model";
import * as TaskActions from '../Actions/tasks.action';

@Injectable()
export class TaskEffects{
    constructor(private $action: Actions, private taskService: TaskService){}

    getAllTasks$ = createEffect(
        () => this.$action.pipe(
            ofType(TaskActions.getAllTasks),
            switchMap(() => {
                return this.taskService.getAllTasks();
            }),
            map((data) => {
                return TaskActions.getAllTasksSuccess({ tasks: <Array<TaskModel>>data });
            }),
            catchError((error) => {
                return of(TaskActions.getAllTasksFailure({error: error}))
            })
        )
    );
}