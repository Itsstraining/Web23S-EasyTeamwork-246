import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { TaskService } from 'src/app/services/tasks/task.service';
import { TaskModel } from 'src/models/task.model';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { TaskCardComponent } from './components/task-card/task-card.component';
import { TaskInfoComponent } from './components/task-info/task-info.component';
import * as TaskActions from '../../../NgRx/Actions/tasks.action';

@Component({
  selector: 'app-hometask',
  templateUrl: './hometask.component.html',
  styleUrls: ['./hometask.component.scss']
})
export class HometaskComponent  implements OnInit{

  constructor(
    private matDialog: MatDialog, private taskService: TaskService,
    private store: Store<{task: TaskModel}>
  ){ 
    this.task$ = this.store.select('task');
  }

  task$ !: Observable<any>;

  todoList: TaskModel[] = [];
  inProgressList: TaskModel[] = [];
  completeList: TaskModel[] = [];  
  dueList: TaskModel[] = [];
  taskList: TaskModel[] = [];

  todoMenu: boolean = true;

  ngOnInit(){
    this.store.dispatch(TaskActions.getAllTasks())
    this.task$.subscribe( (data: any) => {
      if(data != null){
        this.taskList = data.tasks;
        // console.log(data.tasks);
      }else{
        console.log('No data');
      }
    });
    this.sortList();
  }

  sortList(){
    console.log("sort running");
    // for(let i = 0; i < this.taskList.length; i++){
    //   if(this.taskList[i].status == "todo"){
    //     this.todoList.push(this.taskList[i]);
    //   }else if(this.taskList[i].status == "in-progress"){
    //     this.inProgressList.push(this.taskList[i]);
    //   }else if(this.taskList[i].status == "completed"){
    //     this.completeList.push(this.taskList[i]);
    //   }else if(this.taskList[i].status == "due"){
    //     this.dueList.push(this.taskList[i]);
    //   }else{
    //     this.dueList.push(this.taskList[i]);
    //   }
    // }
  }

  dialogAddTaskOpen(enterAnimationDuration: string, exitAnimationDuration: string) {
    this.matDialog.open(AddTaskComponent, {enterAnimationDuration, exitAnimationDuration});
    this.todoList.push(this.taskList[1]);
    for(let i = 0; i < this.taskList.length; i++){
      if(this.taskList[i].status == 'todo'){
        this.todoList.push(this.taskList[i]);
      }else if(this.taskList[i].status == 'in-progress'){
        this.inProgressList.push(this.taskList[i]);
      }else if(this.taskList[i].status == 'completed'){
        this.completeList.push(this.taskList[i]);
      }else if(this.taskList[i].status == 'due'){
        this.dueList.push(this.taskList[i]);
      }else{
        this.dueList.push(this.taskList[i]);
      }
    }
    console.log(this.todoList);
  }

  dialogTaskInfoOpen(enterAnimationDuration: string, exitAnimationDuration: string){
    this.matDialog.open(TaskInfoComponent, {enterAnimationDuration, exitAnimationDuration})
  }

  drop(event: CdkDragDrop<TaskModel[]>){
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  todoMenuEdit() {

  }

  todoMenuDelete() {

  }
}
