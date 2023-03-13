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

  in_progress_list: ProjectModel[] = [];
  completed_list: ProjectModel[] = [];
  overdue_list: ProjectModel[] = [];

  dialogOpen() {
    let addProjectDialog = this.matDialog.open(AddProjectComponent,{
      data: {
        owner_id: this.userService.userInfo.uid,
      },
    })
    console.log("Open dialog", this.userService.userInfo.uid);
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

    this.getAllProject();
  }


  getAllProject(){
    this.store.dispatch(ProjectActions.getAllProjects());
    this.project$.subscribe((data) => {
      if (data) {
        // Get all projects
        this.projectList = data.projects;
        // Get owned projects
        for (let i = 0; i < this.projectList.length; i++) {
          for(let j = 0; j < this.projectList[i].members.length; j++){
            if(this.projectList[i].members[j].uid == this.userService.userInfo.uid){
              this.ownedProjects.push(this.projectList[i]);
            }
          }
        }
        // this.ownedProjects = this.projectList.filter((project) => project.owner_id == this.userService.userInfo.uid);
        console.log("Owned project", this.ownedProjects);
        // Update projects list
        this.projectList = this.ownedProjects;
        // Get project status list
        this.in_progress_list = this.projectList.filter((project) => project.status == "in-progress");
        this.completed_list = this.projectList.filter((project) => project.status == "completed");
        this.overdue_list = this.projectList.filter((project) => project.status == "overdue");

        //   // this.getProjectStatus(this.projectList[i].status, this.projectList[i].is_in_progress, this.projectList[i].is_completed, this.projectList[i].is_overdue);
      }
      else {
        console.log("No data");
      }
    })
  }

  // getProjectStatus(status: Status, is_in_progress: boolean, is_completed: boolean, is_overdue: boolean) {
  //   if (status == "in-progress") {
  //     is_in_progress = true;
  //     is_completed = false;
  //     is_overdue = false;
  //   } else if (status == "completed") {
  //     is_in_progress = false;
  //     is_completed = true;
  //     is_overdue = false;
  //   } else if (status == "overdue") {
  //     is_in_progress = false;
  //     is_completed = false;
  //     is_overdue = true;
  //   }
  // }
  
  deleteProject(project_id: string) {
    this.projectService.delete(project_id).subscribe((data) => {
      console.log("Delete project", data);
      this.ngOnInit();
    });
  }
}