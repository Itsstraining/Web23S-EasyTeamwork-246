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

    getById$ = createEffect(
        () => this.$action.pipe(
            ofType(TaskActions.getById),
            switchMap((data) => {
                return this.taskService.getById(data.id);
            }),
            map((data) => {
                return TaskActions.getByIdSuccess({ task: <TaskModel>data });
            }),
            catchError((error) => {
                return of(TaskActions.getByIdFailure({error: error}))
            }))
    );

    addTask$ = createEffect(
        () => this.$action.pipe(
            ofType(TaskActions.addTask),
            switchMap((data) => {
                return this.taskService.create(data.task);
            }),
            map((data) => {
                console.log(data);
                return TaskActions.addTaskSuccess({ task: <TaskModel>data });
            }),
            catchError((error) => {
                return of(TaskActions.addTaskFailure({error: error}));
            })
        )
    );

    updateTask$ = createEffect(
        () => this.$action.pipe(
            ofType(TaskActions.updateTask),
            switchMap((data) => {
                return this.taskService.update(data.task, data.task.task_id);
            }),
            map((data) => {
                return TaskActions.updateTaskSuccess({ task: <TaskModel>data });
            }),
            catchError((error) => {
                return of(TaskActions.updateTaskFailure({error: error}))
            })
        )
    );
}