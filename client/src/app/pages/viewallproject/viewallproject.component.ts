import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { UserService } from 'src/app/services/users/user.service';
import { ProjectModel } from 'src/models/projects.model';
import { AddProjectComponent } from './components/add-project/add-project.component';
import * as ProjectActions from '../../../NgRx/Actions/projects.action';
import { Observable } from 'rxjs';
import { ShareProjectComponent } from './components/share-project/share-project.component';
import { ProjectService } from 'src/app/services/projects/project.service';

export type Status = "in-progress" | "completed" | "overdue";

@Component({
  selector: 'app-viewallproject',
  templateUrl: './viewallproject.component.html',
  styleUrls: ['./viewallproject.component.scss']
})
export class ViewallprojectComponent implements OnInit {
  constructor(
    private matDialog: MatDialog,
    private userService: UserService,
    private projectService: ProjectService,
    private store: Store<{ project: ProjectModel }>
  ) {
    this.project$ = this.store.select('project');
  }

  project$ !: Observable<any>;

  projectList: ProjectModel[] = [];
  ownedProjects: ProjectModel[] = [];

  sharedProjects: ProjectModel[] = [];
  mySharedProjects: string = '0';

  in_progress_list: ProjectModel[] = [];
  completed_list: ProjectModel[] = [];
  overdue_list: ProjectModel[] = [];
  mark_list: ProjectModel[] = [];


  dialogOpen() {
    let addProjectDialog = this.matDialog.open(AddProjectComponent, {
      data: {
        owner_id: this.userService.userInfo.uid,
      }, autoFocus: false
    })

    addProjectDialog.afterClosed().subscribe((addProject) => {
      this.ownedProjects.push(addProject);
      if (this.mySharedProjects == '0') {
        this.projectList = this.ownedProjects;
      }
    });

    addProjectDialog.afterClosed().subscribe(() => {
      this.ngOnInit();
    });
  }
  opendialogShare() {
    this.matDialog.open(ShareProjectComponent)
  }
  ngOnInit(): void {
    this.projectList = [];
    this.ownedProjects = [];
    this.in_progress_list = [];
    this.completed_list = [];
    this.overdue_list = [];
    this.mark_list = [];

    this.viewAll = true;
    this.viewInprogress = false;
    this.viewCompleted = false;
    this.viewOverdue = false;
    this.viewMarked = false;

    this.getAllProject();

    // this.projectService
    //   .getProjectsByUserId(this.userService.user.uid)
    //   .subscribe((projects) => {
    //     if (projects != null) {
    //       this.ownedProjects = projects;
    //       this.projectRendered = this.ownedProjects;
    //     }
    //   });

    // this.projectService
    //   .getProjectsByJoinedUserId(this.userService.user.uid)
    //   .subscribe((projects) => {
    //     if (projects != null) {
    //       this.sharedProjects = projects;
    //     }
    //   });
  }


  getAllProject() {
    this.projectList = [];
    this.ownedProjects = [];
    this.in_progress_list = [];
    this.completed_list = [];
    this.overdue_list = [];
    this.mark_list = [];

    this.store.dispatch(ProjectActions.getAllProjects());
    this.project$.subscribe((data) => {
      if (data) {
        // Get all projects
        this.projectList = data.projects;
        // Get owned projects
        this.ownedProjects = this.projectList.filter((project) => {
          for (let i = 0; i < project.members.length; i++) {
            if (project.members[i].uid == this.userService.userInfo.uid) {
              return true;
            }
          }
          return false;
        });

        this.changeStatus(this.ownedProjects);

        this.projectList = this.ownedProjects;

        if (this.viewAll == true) {
          this.getOwnedProjects();
        }
        else if (this.viewInprogress == true) {
          this.getInprogressList();
        }
        else if (this.viewCompleted == true) {
          this.getCompletedList();
        }
        else if (this.viewOverdue == true) {
          this.getOverdueList();
        }
        else if (this.viewMarked == true) {
          this.getMarkProject();
        }

        // Get project status list
        this.in_progress_list = this.ownedProjects.filter((project) => project.status == "in-progress");
        this.completed_list = this.ownedProjects.filter((project) => project.status == "completed");
        this.overdue_list = this.ownedProjects.filter((project) => project.status == "overdue");
        this.mark_list = this.ownedProjects.filter((project) => project.marked == true);


      }
      else {
        console.log("No data");
      }
    });
  }

  viewAll: boolean = false;
  viewInprogress: boolean = false;
  viewCompleted: boolean = false;
  viewOverdue: boolean = false;
  viewMarked: boolean = false;

  getOwnedProjects() {
    this.projectList = this.ownedProjects;
    this.viewAll = true;
    this.viewInprogress = false;
    this.viewCompleted = false;
    this.viewOverdue = false;
    this.viewMarked = false;

    this.foundList = [];
  }

  getInprogressList() {
    this.projectList = this.in_progress_list;
    this.viewAll = false;
    this.viewInprogress = true;
    this.viewCompleted = false;
    this.viewOverdue = false;
    this.viewMarked = false;

    this.foundList = [];
  }

  getCompletedList() {
    this.projectList = this.completed_list;
    this.viewAll = false;
    this.viewInprogress = false;
    this.viewCompleted = true;
    this.viewOverdue = false;
    this.viewMarked = false;

    this.foundList = [];
  }

  getOverdueList() {
    this.projectList = this.overdue_list;
    this.viewAll = false;
    this.viewInprogress = false;
    this.viewCompleted = false;
    this.viewOverdue = true;
    this.viewMarked = false;

    this.foundList = [];
  }

  getMarkProject() {
    this.projectList = this.mark_list;
    this.viewAll = false;
    this.viewInprogress = false;
    this.viewCompleted = false;
    this.viewOverdue = false;
    this.viewMarked = true;

    this.foundList = [];
  }

  markProject(marked: boolean, project: ProjectModel) {
    if (marked == false) {
      marked = true;
    }
    else {
      marked = false;
    }
    let updateProject: ProjectModel = {
      project_id: project.project_id,
      marked: marked,
      name: project.name,
      owner: project.owner,
      owner_photo: project.owner_photo,
      owner_id: project.owner_id,
      due_date: project.due_date,
      status: project.status,
      disable: project.disable,
      members: project.members,
    };

    this.projectService.update(updateProject, project.project_id).subscribe((data) => {
      console.log("Mark project", data);
      this.getAllProject();
    });
  }

  deleteProject(project_id: string) {
    this.projectService.delete(project_id).subscribe((data) => {
      console.log("Delete project", data);
      this.ngOnInit();
    });
  }

  changeStatus(projectList: ProjectModel[]) {
    for (let i = 0; i < projectList.length; i++) {
      let currentDate: string = new Date().toLocaleDateString();
      let date_of_currentDate: number = parseInt(currentDate.split("/")[0]);
      let month_of_currentDate: number = parseInt(currentDate.split("/")[1]);
      let year_of_currentDate: number = parseInt(currentDate.split("/")[2]);

      let dueDate: string = projectList[i].due_date;
      let date_of_dueDate: number = parseInt(dueDate.split("/")[1]);
      let month_of_dueDate: number = parseInt(dueDate.split("/")[0]);
      let year_of_dueDate: number = parseInt(dueDate.split("/")[2]);

      let status: Status;

      if ((year_of_currentDate > year_of_dueDate) && (projectList[i].status != "completed")) {
        status = "overdue";
      }
      else if ((year_of_currentDate == year_of_dueDate) && (projectList[i].status != "completed")) {
        if (month_of_currentDate > month_of_dueDate) {
          status = "overdue";
        }
        else if (month_of_currentDate == month_of_dueDate) {
          if (date_of_currentDate >= date_of_dueDate) {
            status = "overdue";
          }
          else {
            status = projectList[i].status;
          }
        }
        else {
          status = projectList[i].status;
        }
      }
      else {
        status = projectList[i].status;
      }

      let updateProject: ProjectModel = {
        project_id: projectList[i].project_id,
        marked: projectList[i].marked,
        name: projectList[i].name,
        owner: projectList[i].owner,
        owner_photo: projectList[i].owner_photo,
        owner_id: projectList[i].owner_id,
        due_date: projectList[i].due_date,
        status: status,
        disable: projectList[i].disable,
        members: projectList[i].members,
      };

      this.projectService.update(updateProject, projectList[i].project_id)
    }
  }

  projectName!: string;
  foundList: ProjectModel[] = [];
  findProject() {
    for (let i = 0; i < this.ownedProjects.length; i++) {
      if (this.ownedProjects[i].name == this.projectName) {
        this.foundList = [];
        this.foundList.push(this.ownedProjects[i]);
        break;
      }
      else {
        this.foundList = [];
      }
    }
    this.projectList = this.foundList;
  }

  sortProjects(event: string) {
    if (event === '0') {
      if(this.ownedProjects != null){
        this.projectList = this.ownedProjects;
      }else{
        this.projectList = [];
      }
    } else {
      if(this.sharedProjects != null){
        this.projectList = this.sharedProjects;
      }else{
        this.projectList = [];
      }
    }
  }

}
