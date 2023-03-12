import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Complexity, Status, TaskModel } from 'src/models/task.model';
import * as TaskActions from '../../../../../NgRx/Actions/tasks.action';
import { AddTaskComponent } from '../add-task/add-task.component';

@Component({
  selector: 'app-task-info',
  templateUrl: './task-info.component.html',
  styleUrls: ['./task-info.component.scss']
})
// export type Mutable<T> = { -readonly [P in keyof T]: T[P] }

export class TaskInfoComponent implements OnInit{
  

  taskById$ !: Observable<any>;
  task: TaskModel = {
    task_id: '',
    project_id: '',
    assignee: [],
    name: '',
    description: '',
    status: 'todo',
    complexity: 'easy',
    deadline: '',
    comment_count: 0,
    created_at: '',
    updated_at: ''
  };

  temp: Mutable<TaskModel> = this.task;

  taskName!: string;
  taskDescription!: string;
  taskComplex!: Complexity;
  taskStatus!: Status;

  constructor(
    private store: Store<{task: TaskModel}>,
    public dialogRef: MatDialogRef<AddTaskComponent>,
  ) { 
    this.taskById$ = this.store.select('task');
   }

  ngOnInit(): void {
    // this.temp = this.task;
    this.temp.assignee = this.task.assignee;
    this.temp.comment_count = this.task.comment_count;
    this.temp.complexity = this.task.complexity;
    this.temp.created_at = this.task.created_at;
    this.temp.deadline = this.task.deadline;
    this.temp.description = this.task.description;
    this.temp.name = this.task.name;
    this.temp.project_id = this.task.project_id;
    this.temp.status = this.task.status;
    this.temp.task_id = this.task.task_id;
    this.temp.updated_at = this.getDate();
  }

  getDate(){
    const date = new Date();

    return date.toLocaleDateString();
  }

  updateTask(){
    this.store.dispatch(TaskActions.updateTask({task: this.temp, id: this.temp.task_id}));
    this.closeDialog();
  }

  deleteTask(){
    this.store.dispatch(TaskActions.deleteTask({task_id: this.temp.task_id}));
    this.closeDialog();
  }

  closeDialog(){
    this.dialogRef.close();
  }
}

type Mutable<Type> = {
  -readonly [Key in keyof Type]: Type[Key];
};