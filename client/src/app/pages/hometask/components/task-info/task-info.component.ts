import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { TaskModel } from 'src/models/task.model';
import * as TaskActions from '../../../../../NgRx/Actions/tasks.action';
import { AddTaskComponent } from '../add-task/add-task.component';

@Component({
  selector: 'app-task-info',
  templateUrl: './task-info.component.html',
  styleUrls: ['./task-info.component.scss']
})
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

  task_id !: string;

  constructor(
    private store: Store<{task: TaskModel}>,
    public dialogRef: MatDialogRef<AddTaskComponent>,
  ) { 
    this.taskById$ = this.store.select('task');
   }



  ngOnInit(): void {
    
  }

  getTaskID(){
  }

  closeDialog(){
    this.dialogRef.close();
  }
}
