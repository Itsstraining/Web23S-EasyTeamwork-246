import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogState } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { delay, map, Observable } from 'rxjs';
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
import { UserState } from 'src/NgRx/States/user.state';
import * as ProjectAction from '../../../NgRx/Actions/projects.action';
import { ProjectState } from 'src/NgRx/States/projects.state';
import { MemberComponent } from 'src/app/components/member/member.component';

@Component({
  selector: 'app-hometask',
  templateUrl: './hometask.component.html',
  styleUrls: ['./hometask.component.scss']
})
export class HometaskComponent implements OnInit {
  projects$: Observable<ProjectState>;
  auth$!: Observable<UserState>;
  user!: UserModel;
  users: Array<any> = [];
  idParam!: string;

  constructor(
    private matDialog: MatDialog,
    private taskService: TaskService,
    private store: Store<{ task: TaskModel, user: UserState, project: ProjectState }>,
    private router: ActivatedRoute,
    private projectService: ProjectService,
    private userService: UserService,
  ) {
    this.task$ = this.store.select('task');

    this.projects$ = this.store.select('project');
    this.auth$ = this.store.select('user');
    this.auth$.subscribe((res) => {
      this.user = res.user!;
    })
    this.store.dispatch(ProjectAction.getProjectById({ project_id: this.idParam }));
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
  project_due_date!: string;
  project_status!: string;
  project_owner!: string;
  project_members!: string;
  project_info!: ProjectModel;
  prj_id: string = '';

  owner_id: string = '';
  owner_name: string = '';
  owner_img: string = '';

  all_members: UserModel[] = [];
  usr_count: number = 0;

  ngOnInit() {
    this.todoList = [];
    this.inProgressList = [];
    this.completeList = [];
    this.dueList = [];
    this.taskList = [];
    this.usr_count = 0;
    this.router.params.subscribe((param) => {
      this.prj_id = param['id'];
      this.projectService.idParam = param['id'];
      this.getSocket();
      this.getProject();
      this.getAllTasks(param['id']);
    });

    this.countusermembers();
  }

  getProject() {
    this.projectService.getProjectById(this.prj_id).subscribe((data: any) => {
      this.project_info = data;
      this.project_name = data.name;
      this.project_due_date = data.due_date;
      this.project_status = data.status;
      this.project_owner = data.owner;
      this.project_members = data.members;
      this.project_deadline = data.due_date;
      this.getOwnerInfo();
      this.addUser();      
      this.usr_count = 0;

      if (this.project_info.status === 'overdue') {
        let temp: TaskModel[] = [];
        this.taskList.forEach((task) => temp.push(Object.assign({}, task)));

        for (let i = 0; i < temp.length; i++) {
          if (temp[i].status != 'completed') {
            temp[i].status = 'due';
            this.sendTest(temp[i]);
          }
        }
      }
    });
  }

  countusermembers() {
    if (this.usr_count > 3) {
      return
    }
    else if (this.usr_count == 0) {
      this.usr_count = this.project_members.length;
      this.usr_count--;
    }
    else {
      this.usr_count = this.project_members.length;
      this.usr_count++;
    }
  }

  getAllTasks(project_id: string) {
    this.store.dispatch(TaskActions.getByProjectId({ project_id: project_id }));
    this.task$.subscribe((data: any) => {
      if (data != null) {
        this.taskList = data.tasks;
        this.todoList = this.taskList.filter((task) => task.status === 'todo');
        this.inProgressList = this.taskList.filter((task) => task.status === 'in-progress');
        this.completeList = this.taskList.filter((task) => task.status === 'completed');
        this.dueList = this.taskList.filter((task) => task.status === 'due');
      } else {
        // console.log('No data');
      }
    });
  }

  openMember(){
    this.matDialog.open(MemberComponent)
  }
  getSocket() {
    this.taskList.forEach((task) => this.taskPrj.push(Object.assign({}, task)));
    this.test$ = this.taskService.getTest(this.prj_id);
    this.test$.subscribe((data: any) => {
      this.cloneList(data);
    });
  }

  sendTest(newTest: TaskModel) {
    this.taskService.sendTest(newTest);
    this.cloneList(newTest);
    this.store.dispatch(TaskActions.updateTask({ task: newTest, id: newTest.task_id }));
  }

  cloneList(newTest: TaskModel) {
    let tempTask: TaskModel[] = [];
    this.taskList.forEach((task) => tempTask.push(Object.assign({}, task)));
    let tempIndex = tempTask.findIndex((index) => index.task_id === newTest.task_id);
    tempTask[tempIndex] = newTest;
    this.taskList = tempTask;

    this.todoList = this.taskList.filter((task) => task.status === 'todo');
    this.inProgressList = this.taskList.filter((task) => task.status === 'in-progress');
    this.completeList = this.taskList.filter((task) => task.status === 'completed');
    this.dueList = this.taskList.filter((task) => task.status === 'due');
  }

  delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  dialogAddTaskOpen(enterAnimationDuration: string, exitAnimationDuration: string) {
    let addTaskDialog = this.matDialog.open(AddTaskComponent, { enterAnimationDuration, exitAnimationDuration, autoFocus: false });
    this.task_id = this.chckId();
    let instance = addTaskDialog.componentInstance;
    instance.prj_id = this.prj_id;
    instance.task_id = this.task_id;
    instance.members.push(this.project_info.members[0]);
    addTaskDialog.afterClosed().subscribe(result =>{
      this.taskService.sendTest(result);
      this.getSocket();
      this.ngOnInit();
    });
  }

  dialogTaskInfoOpen(enterAnimationDuration: string, exitAnimationDuration: string, tId: string) {
    let taskInfoDialog = this.matDialog.open(TaskInfoComponent, { enterAnimationDuration, exitAnimationDuration, autoFocus: false });
    let instance = taskInfoDialog.componentInstance;
    instance.project = this.project_info;
    this.taskList.filter((task) => {
      if (task.task_id === tId) {
        instance.task = task;
      }
    });

    taskInfoDialog.afterClosed().subscribe((result) => {
      // this.store.dispatch(TaskActions.updateTask({ task: result, id: result.task_id }));
      for(let i = 0; i < 50; i++){
        this.ngOnInit();
      }
    });
  }

  drop(event: CdkDragDrop<TaskModel[]>, listName: string) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );

      if (listName === 'todo') {
        let tempList = this.updateList('todo', event.currentIndex);
        this.sendTest(tempList);
      } else if (listName === 'in-progress') {
        let tempList = this.updateList('in-progress', event.currentIndex);
        this.sendTest(tempList);
      } else if (listName === 'completed') {
        let tempList = this.updateList('completed', event.currentIndex);
        this.sendTest(tempList);
      } else if (listName === 'due') {
        let tempList = this.updateList('due', event.currentIndex);
        this.sendTest(tempList);
      }
    }
  }

  updateList(listName: Status, index: number): TaskModel {
    let list: any;
    if (listName === 'todo') {
      list = this.todoList;
    } else if (listName === 'in-progress') {
      list = this.inProgressList;
    } else if (listName === 'completed') {
      list = this.completeList;
    } else if (listName === 'due') {
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

  taskIdGen() {
    let id = 't';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 10; i++) {
      id += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return id;
  }

  chckId(): string {
    let tempID = this.taskIdGen();
    for (let i = 0; i < this.taskList.length; i++) {
      if (this.taskList[i].task_id == tempID) {
        // console.log("id conflict");
        return tempID = "null";
      } else {
        return tempID;
      }
    }
    return tempID
  }

  getTaskInfo(task_id: string) {
    this.singleTask = this.taskList.filter((task) => task.task_id === task_id)[0];
  }

  getOwnerInfo() {
    this.owner_img = this.userService.userInfo.photoURL;
    this.owner_name = this.userService.userInfo.displayName;
  }

  addUser() {
    if (this.all_members.length > 3) {
      for (let i = 3; i < this.all_members.length; i++) {
        this.usr_count = this.usr_count + 1;
      }
    }
    this.all_members = this.project_info.members;
  }

  ///THIS IS LEON THE MIGHTY LION KING CODE //Leon here
  dialogShareProject() {
    this.matDialog.open(ShareProjectComponent)

    this.store.dispatch(ProjectAction.getProjectById({ project_id: this.prj_id }));
    this.projects$.subscribe((project) => {

    })
  }

  updateUrl(src: any) {
    (src.target as HTMLImageElement).src = "data:image/png;base64,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"
  }
}

type Mutable<Type> = {
  -readonly [Key in keyof Type]: Type[Key];
};
