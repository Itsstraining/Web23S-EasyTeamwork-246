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

    // làm tiếp khúc cho
    // .close.subscribe((addProject) => {
    //     this.ownedProjects.push(addProject);
    //     if (this.mySharedProjects == '0') {
    //       this.projectList = this.ownedProjects;
    //     }
    //   });

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
    this.in_progress_list = [];
    this.completed_list = [];
    this.overdue_list = [];
    this.mark_list = [];

    this.getAllProject();
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

        this.projectList = this.ownedProjects;

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

  getOwnedProjects() {
    this.projectList = this.ownedProjects;
  }

  getInprogressList() {
    this.projectList = this.in_progress_list;
  }

  getCompletedList() {
    this.projectList = this.completed_list;
  }

  getOverdueList() {
    this.projectList = this.overdue_list;
  }

  getMarkProject() {
    this.projectList = this.mark_list;
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
      this.ngOnInit();
    });
  }

  deleteProject(project_id: string) {
    this.projectService.delete(project_id).subscribe((data) => {
      console.log("Delete project", data);
      this.ngOnInit();
    });
  }
}
