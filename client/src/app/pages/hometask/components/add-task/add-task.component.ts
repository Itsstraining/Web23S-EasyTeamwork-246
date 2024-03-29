import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { TaskService } from 'src/app/services/tasks/task.service';
import { TaskModel } from 'src/models/task.model';
import { Complexity } from 'src/models/task.model';
import { HometaskComponent } from '../../hometask.component';
import * as TaskActions from '../../../../../NgRx/Actions/tasks.action';
import { UserModel } from 'src/models/user.model';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent{

  task$ !: Observable<any>;
  public test: string = 'test';

  constructor(
    public dialogRef: MatDialogRef<AddTaskComponent>,
    private taskService: TaskService,
    private store: Store<{task: TaskModel}>,
  ) { 
    this.task$ = this.store.select('task');
  }

  getDate(){

    const time = new Date();

    return time.toLocaleDateString();
  }

  currentDate: any = new Date();
  deadline = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), this.currentDate.getDate() + 1);

  backTask!: TaskModel;
  taskName = '';
  taskDescription = '';
  taskComplexRaw = '';
  dateRaw !: string;
  taskComplex !: Complexity;
  prj_id !: string;
  task_id !: string;
  due_date !: string;
  members: UserModel[] = [];
  

  displayComplex(value: number): string{
    if(value == 1){
      return 'Easy';
    }else if(value == 2){
      return 'Medium';
    }else{
      return 'Hard';
    }
  }

  addTask(){
    let date = this.dateRaw.toString();
    let formatDate = date.split(' ');
    let create_date = this.getDate();
    let created_date = create_date.split('/');
    

    if(parseInt(created_date[0]) < 10){
      created_date[0] = '0' + created_date[0];
    }

    if(this.taskComplexRaw){
      if(this.taskComplexRaw == '1'){
        this.taskComplex = 'easy';
      }else if(this.taskComplexRaw == '2'){
        this.taskComplex = 'medium';
      }else if(this.taskComplexRaw == '3'){
        this.taskComplex = 'hard';
      }
    }else{
      this.taskComplex = 'easy';
    }
    
    switch(formatDate[1]){
      case 'Jan':
        formatDate[1] = '01';
        break;
      case 'Feb':
        formatDate[1] = '02';
        break;
      case 'Mar':
        formatDate[1] = '03';
        break;
      case 'Apr':
        formatDate[1] = '04';
        break;
      case 'May':
        formatDate[1] = '05';
        break;
      case 'Jun':
        formatDate[1] = '06';
        break;
      case 'Jul':
        formatDate[1] = '07';
        break;
      case 'Aug':
        formatDate[1] = '08';
        break;
      case 'Sep':
        formatDate[1] = '09';
        break;
      case 'Oct':
        formatDate[1] = '10';
        break;
      case 'Nov':
        formatDate[1] = '11';
        break;
      case 'Dec':
        formatDate[1] = '12';
        break;
    }

    this.due_date = formatDate[1] + "/" + formatDate[2] + "/"  + formatDate[3];

    let task: TaskModel = {
      task_id: this.task_id,
      project_id: this.prj_id,
      assignee: [],
      name: this.taskName,
      description: this.taskDescription,
      status: 'todo',
      complexity: this.taskComplex,
      deadline: this.due_date,
      comment_count: 0,
      created_at: created_date[0] + '/' + created_date[1] + '/' + created_date[2],
      updated_at: ''
    };

    this.backTask = task;

    if(task){
      this.store.dispatch(TaskActions.addTask({task: task}));
      this.dialogRef.close({data: this.backTask});
    }else{
      console.log('Error');
    }
  }

  closeDialog(){
    this.dialogRef.close({data: this.backTask});
  }
}
