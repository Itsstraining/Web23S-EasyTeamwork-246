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
export class HometaskComponent implements OnInit{

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
  singleTask: TaskModel[] =[];
  prj_id: string = '';
  task_id: string = '';

  todoMenu: boolean = true;

  ngOnInit(){
    this.todoList = [];
    this.inProgressList = [];
    this.completeList = [];
    this.dueList = [];
    this.taskList = [];
    this.getAllTasks();
  }

  getAllTasks(){
    this.store.dispatch(TaskActions.getAllTasks())
    this.task$.subscribe( (data: any) => {
      if(data != null){
        this.taskList = data.tasks;
        this.todoList = this.taskList.filter((task) => task.status === 'todo');
        this.inProgressList = this.taskList.filter((task) => task.status === 'in-progress');
        this.completeList = this.taskList.filter((task) => task.status === 'completed');
        this.dueList = this.taskList.filter((task) => task.status === 'due');
      }else{
        console.log('No data');
      }
    });
  }

  dialogAddTaskOpen(enterAnimationDuration: string, exitAnimationDuration: string) {
    let addTaskDialog = this.matDialog.open(AddTaskComponent, {enterAnimationDuration, exitAnimationDuration, autoFocus: false});
    this.prj_id = this.taskList[0].project_id;
    this.chckId();
    let instance = addTaskDialog.componentInstance;
    instance.prj_id = this.prj_id;
    instance.task_id = this.task_id;
  }

  dialogTaskInfoOpen(enterAnimationDuration: string, exitAnimationDuration: string, tId: string){
    let taskInfoDialog = this.matDialog.open(TaskInfoComponent, {enterAnimationDuration, exitAnimationDuration, autoFocus: false});
    let instance = taskInfoDialog.componentInstance;
    this.taskList.filter((task) => {
      if(task.task_id === tId){ 
        instance.task = task;
      }});
    // instance.task_id = tId;
  }

  drop(event: CdkDragDrop<TaskModel[]>, listName: string){
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      // console.log(event.currentIndex);
      // switch(listName){
      //   case 'todo':
          
      //     // this.todoList[event.currentIndex] = ;
      //     break;
      //   case 'inPogress':
      //     event.container.data[event.currentIndex].status = 'in-progress';
      //     break;
      //   case 'completed':
      //     event.container.data[event.currentIndex].status = 'completed';
      //     break;
      //   case 'due':
      //     event.container.data[event.currentIndex].status = 'due';
      //     break;
      // }
    }
  }

  todoMenuEdit() {

  }

  taskIdGen(){
    let id = 't';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for(let i = 0; i < 10; i++){
      id += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return id;
  }

  chckId(){
    let tempID = this.taskIdGen();
    for(let i =0; i < this.taskList.length; i++){
      if(this.taskList[i].task_id == tempID){
        console.log("id conflict");
      }else{
        this.task_id = tempID;
      }
    }
  }
}
