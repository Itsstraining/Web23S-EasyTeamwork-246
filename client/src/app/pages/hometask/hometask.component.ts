import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogState } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { TaskService } from 'src/app/services/tasks/task.service';
import { Status, TaskModel } from 'src/models/task.model';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { TaskInfoComponent } from './components/task-info/task-info.component';
import * as TaskActions from '../../../NgRx/Actions/tasks.action';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from 'src/app/services/projects/project.service';
import { ProjectModel } from 'src/models/projects.model';
import { UserService } from 'src/app/services/users/user.service';
import { ShareProjectComponent } from 'src/app/components/share-project/share-project.component';
import { UserModel } from 'src/models/user.model';

@Component({
  selector: 'app-hometask',
  templateUrl: './hometask.component.html',
  styleUrls: ['./hometask.component.scss']
})
export class HometaskComponent implements OnInit{
  constructor(
    private matDialog: MatDialog,
    private taskService: TaskService,
    private store: Store<{task: TaskModel}>,
    private router: ActivatedRoute,
    private projectService: ProjectService,
    private userService: UserService,
  ){
    this.task$ = this.store.select('task');
  }

  test$!: Observable<any>;
  task$ !: Observable<TaskModel>;

  todoList: TaskModel[] = [];
  inProgressList: TaskModel[] = [];
  completeList: TaskModel[] = [];
  dueList: TaskModel[] = [];
  taskList: TaskModel[] = [];
  taskPrj: TaskModel[] = [];
  singleTask!: TaskModel;
  task_id: string = '';

  project_name!: string;
  project_deadline!: string;
  project_info!: ProjectModel;
  prj_id: string = '';

  owner_id: string = '';
  owner_name: string = '';
  owner_img: string = '';

  all_members: UserModel[] = [];
  usr_count!: number;

  ngOnInit(){
    this.todoList = [];
    this.inProgressList = [];
    this.completeList = [];
    this.dueList = [];
    this.taskList = [];
    this.router.params.subscribe( (param) => {
      this.prj_id = param['id'];
      this.getSocket();
      this.getAllTasks(param['id']);
      this.getProject();
    });
  }

  getProject(){
    this.projectService.getById(this.prj_id).subscribe( (data: any) => {
      this.project_info = data[0];
      this.project_name = data[0].name;
      this.project_deadline = data[0].due_date;
      this.getOwnerInfo();
      this.addUser();

      if(this.project_info.status === 'overdue'){
        let temp: TaskModel[] = [];
        this.taskList.forEach( (task) => temp.push(Object.assign({}, task)));

        for(let i = 0; i < temp.length; i++){
          console.log("for running");
          if(temp[i].status != 'completed'){
            temp[i].status = 'due';
            this.sendTest(temp[i]);
          }
        }
      }
    });
  }

  getAllTasks(project_id: string){
    this.store.dispatch(TaskActions.getByProjectId({project_id: project_id}));
    this.task$.subscribe( (data: any) => {
      if(data != null){ 
        this.taskList = data.tasks;
        // this.getStatus(); //Leon here
        
        this.todoList = this.taskList.filter((task) => task.status === 'todo');
        this.inProgressList = this.taskList.filter((task) => task.status === 'in-progress');
        this.completeList = this.taskList.filter((task) => task.status === 'completed');
        this.dueList = this.taskList.filter((task) => task.status === 'due');
      }else{
        console.log('No data');
      }
    });
  }

  getSocket(){
    this.taskList.forEach( (task) => this.taskPrj.push(Object.assign({}, task)));
    this.test$ = this.taskService.getTest(this.prj_id);
    this.test$.subscribe( (data: any) => {
      this.cloneList(data);
      // console.log("TaskList: ", this.taskList);
    })
  }

  sendTest(newTest: TaskModel){
    this.taskService.sendTest(newTest);
    this.cloneList(newTest);
    this.store.dispatch(TaskActions.updateTask({task: newTest, id: newTest.task_id}));
    // this.ngOnInit();
  }

  cloneList(newTest: TaskModel){
    let tempTask: TaskModel[] = [];
    this.taskList.forEach( (task) => tempTask.push(Object.assign({}, task)));
    let tempIndex = tempTask.findIndex((index) => index.task_id === newTest.task_id);
    tempTask[tempIndex] = newTest;
    this.taskList = tempTask;

    this.todoList = this.taskList.filter((task) => task.status === 'todo');
    this.inProgressList = this.taskList.filter((task) => task.status === 'in-progress');
    this.completeList = this.taskList.filter((task) => task.status === 'completed');
    this.dueList = this.taskList.filter((task) => task.status === 'due');
  }

  dialogAddTaskOpen(enterAnimationDuration: string, exitAnimationDuration: string) {
    let addTaskDialog = this.matDialog.open(AddTaskComponent, {enterAnimationDuration, exitAnimationDuration, autoFocus: false});
    this.task_id = this.chckId();
    let instance = addTaskDialog.componentInstance;
    instance.prj_id = this.prj_id;
    instance.task_id = this.task_id;
    addTaskDialog.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  dialogTaskInfoOpen(enterAnimationDuration: string, exitAnimationDuration: string, tId: string){
    let taskInfoDialog = this.matDialog.open(TaskInfoComponent, {enterAnimationDuration, exitAnimationDuration, autoFocus: false});
    let instance = taskInfoDialog.componentInstance;
    instance.project = this.project_info;
    this.taskList.filter((task) => {
      if(task.task_id === tId){
        instance.task = task;
      }
    });

    taskInfoDialog.afterClosed().subscribe((result) => {      
      this.ngOnInit();
    });
  }

  drop(event: CdkDragDrop<TaskModel[]>, listName: string){
    console.log(this.taskList.find((task) => task.name === 'd1wa'));
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );

      if(listName === 'todo'){
        let tempList = this.updateList('todo', event.currentIndex);
        this.sendTest(tempList);
      }else if(listName === 'in-progress'){
        let tempList = this.updateList('in-progress', event.currentIndex);
        this.sendTest(tempList);
      }else if(listName === 'completed'){
        let tempList = this.updateList('completed', event.currentIndex);
        this.sendTest(tempList);
      }else if(listName === 'due'){
        let tempList = this.updateList('due', event.currentIndex);
        this.sendTest(tempList);
      }
    }
  }

  updateList(listName: Status, index: number): TaskModel{
    let list: any;
    if(listName === 'todo'){
      list = this.todoList;
    }else if(listName === 'in-progress'){
      list = this.inProgressList;
    }else if(listName === 'completed'){
      list = this.completeList;
    }else if(listName === 'due'){
      list = this.dueList;
    }

    const tmp: Mutable<TaskModel> = {
      task_id: list[index].task_id,
      project_id: list[index].project_id,
      name: list[index].name,
      description: list[index].description,
      assignee: list[index].assignee,
      status: listName,
      complexity: list[index].complexity,
      comment_count: list[index].comment_count,
      deadline: list[index].deadline,
      created_at: list[index].created_at,
      updated_at: list[index].updated_at
    };

    return tmp;
  }

  taskIdGen(){
    let id = 't';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for(let i = 0; i < 10; i++){
      id += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return id;
  }

  chckId(): string{
    let tempID = this.taskIdGen();
    for(let i =0; i < this.taskList.length; i++){
      if(this.taskList[i].task_id == tempID){
        console.log("id conflict");
        return tempID = "null";
      }else{
        return tempID;
      }
    }
    return tempID
  }

  getTaskInfo(task_id: string){
    this.singleTask = this.taskList.filter( (task) => task.task_id === task_id)[0];
  }

  getOwnerInfo(){
    this.owner_img = this.userService.userInfo.photoURL;
    this.owner_name = this.userService.userInfo.displayName;
  }

  addUser(){
    if(this.all_members.length > 3){
      for(let i = 3; i < this.all_members.length; i++){
        this.usr_count = this.usr_count + 1;
      }
    }
    this.all_members = this.project_info.members;
  }

  ///THIS IS LEON THE MIGHTY LION KING CODE //Leon here
  dialogShareProject(enterAnimationDuration: string, exitAnimationDuration: string) {
    let shareProjectDialog =this.matDialog.open(ShareProjectComponent, {
      data: {
        project: this.project_info
      }, autoFocus: false
    })
    // console.log(this.task_id);
    shareProjectDialog.afterClosed().subscribe(() =>{
      // this.sendTest(result.data);
      this.ngOnInit();
    });
  }
}

type Mutable<Type> = {
  -readonly [Key in keyof Type]: Type[Key];
};