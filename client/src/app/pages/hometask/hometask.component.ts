import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogState } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { TaskService } from 'src/app/services/tasks/task.service';
import { Status, TaskModel } from 'src/models/task.model';
import { AddTaskComponent } from './components/add-task/add-task.component';
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
    this.taskPrj$ = this.store.select('task');
  }

  task$ !: Observable<TaskModel>;

  todoList: TaskModel[] = [];
  inProgressList: TaskModel[] = [];
  completeList: TaskModel[] = [];  
  dueList: TaskModel[] = [];
  taskList: TaskModel[] = [];
  singleTask: TaskModel[] =[];
  prj_id: string = '';
  task_id: string = '';

  temp: Mutable<TaskModel> = this.taskList[0];

  todoMenu: boolean = true;
  infoOpened: boolean = false;

  ngOnInit(){
    // this.todoList = [];
    // this.inProgressList = [];
    // this.completeList = [];
    // this.dueList = [];
    // this.taskList = [];
    // this.getAllTasks();
  }

  // getAllTasks(){
  //   this.store.dispatch(TaskActions.getAllTasks());
  //   this.task$.subscribe( (data: any) => {
  //     if(data != null){
  //       this.taskList = data.tasks;
  //       this.todoList = this.taskList.filter((task) => task.status === 'todo');
  //       this.inProgressList = this.taskList.filter((task) => task.status === 'in-progress');
  //       this.completeList = this.taskList.filter((task) => task.status === 'completed');
  //       this.dueList = this.taskList.filter((task) => task.status === 'due');
  //     }else{
  //       console.log('No data');
  //     }
  //   });
  // }

  taskPrj$ !: Observable<any>;
  taskPrj: TaskModel[] = [];

  getTaskByPrjId(){
    // let prj_id = this.taskList[0].project_id;
    this.taskPrj$ = this.taskService.getAllTasksByProjectId('prj0002');
    // this.store.dispatch(TaskActions.getTasksByProjectId({project_id: 'prj01'}));
    this.taskPrj$.subscribe((data: any) => {
      console.log(data.tasks);
      // this.taskPrj = data.tasks;
      this.taskPrj.push(data.tasks);
    });
  }

  sendTask(){
    let task : TaskModel = {
      task_id: 'task01',
      project_id: 'prj01',
      name: 'Task 01',
      description: 'Task 01 description',
      status: 'todo',
      complexity: 'easy',
      assignee: [],
      deadline: '2021-08-01',
      created_at: '2021-07-01',
      updated_at: '2021-07-01',
      comment_count: 0,
    }
    this.taskService.sendTask(task);
  }

  // dialogAddTaskOpen(enterAnimationDuration: string, exitAnimationDuration: string) {
  //   let addTaskDialog = this.matDialog.open(AddTaskComponent, {enterAnimationDuration, exitAnimationDuration, autoFocus: false});
  //   this.prj_id = this.taskList[0].project_id;
  //   this.chckId();
  //   let instance = addTaskDialog.componentInstance;
  //   instance.prj_id = this.prj_id;
  //   instance.task_id = this.task_id;
  // }

  // dialogTaskInfoOpen(enterAnimationDuration: string, exitAnimationDuration: string, tId: string){
  //   let taskInfoDialog = this.matDialog.open(TaskInfoComponent, {enterAnimationDuration, exitAnimationDuration, autoFocus: false});
  //   let instance = taskInfoDialog.componentInstance;
  //   this.taskList.filter((task) => {
  //     if(task.task_id === tId){ 
  //       instance.task = task;
  //     }
  //   });

  //   taskInfoDialog.afterClosed().subscribe(() => {
  //     this.ngOnInit();
  //   });
  // }

  // drop(event: CdkDragDrop<TaskModel[]>, listName: string){
  //   if (event.previousContainer === event.container) {
  //     moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  //   } else {
  //     transferArrayItem(
  //       event.previousContainer.data,
  //       event.container.data,
  //       event.previousIndex,
  //       event.currentIndex,
  //     );

  //     if(listName === 'todo'){
  //       let tempList = this.updateList('todo', event.currentIndex);
  //       this.store.dispatch(TaskActions.updateTask({task: tempList, id: tempList.task_id}));
  //     }else if(listName === 'in-progress'){
  //       let tempList = this.updateList('in-progress', event.currentIndex);
  //       this.store.dispatch(TaskActions.updateTask({task: tempList, id: tempList.task_id}));
  //     }else if(listName === 'completed'){
  //       let tempList = this.updateList('completed', event.currentIndex);
  //       this.store.dispatch(TaskActions.updateTask({task: tempList, id: tempList.task_id}));
  //     }else if(listName === 'due'){
  //       let tempList = this.updateList('due', event.currentIndex);
  //       this.store.dispatch(TaskActions.updateTask({task: tempList, id: tempList.task_id}));
  //     }
  //   }
  // }

  // updateList(listName: Status, index: number): TaskModel{
  //   let list: any;
  //   if(listName === 'todo'){
  //     list = this.todoList;
  //   }else if(listName === 'in-progress'){
  //     list = this.inProgressList;
  //   }else if(listName === 'completed'){
  //     list = this.completeList;
  //   }else if(listName === 'due'){
  //     list = this.dueList;
  //   }

  //   const tmp: Mutable<TaskModel> = {
  //     task_id: list[index].task_id,
  //     project_id: list[index].project_id,
  //     name: list[index].name,
  //     description: list[index].description,
  //     assignee: list[index].assignee,
  //     status: listName,
  //     complexity: list[index].complexity,
  //     comment_count: list[index].comment_count,
  //     deadline: list[index].deadline,
  //     created_at: list[index].created_at,
  //     updated_at: list[index].updated_at
  //   };

  //   return tmp;
  // }

  // taskIdGen(){
  //   let id = 't';
  //   let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  //   for(let i = 0; i < 10; i++){
  //     id += possible.charAt(Math.floor(Math.random() * possible.length));
  //   }
  //   return id;
  // }

  // chckId(){
  //   let tempID = this.taskIdGen();
  //   for(let i =0; i < this.taskList.length; i++){
  //     if(this.taskList[i].task_id == tempID){
  //       console.log("id conflict");
  //     }else{
  //       this.task_id = tempID;
  //     }
  //   }
  // }

  
}

type Mutable<Type> = {
  -readonly [Key in keyof Type]: Type[Key];
};
