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

  total_amount: number = 0;
  in_progress_amount: number = 0;
  completed_amount: number = 0;
  overdue_amount: number = 0;

  dialogOpen() {
    this.matDialog.open(AddProjectComponent, {
      data: {
        owner_id: this.userService.userInfo.uid,
      },
    })
    console.log("Open dialog", this.userService.userInfo.uid);
  }
  opendialogShare() {
    this.matDialog.open(ShareProjectComponent)
  }
  ngOnInit(): void {
    this.store.dispatch(ProjectActions.getAllProjects());
    this.project$.subscribe((data) => {
      if (data) {
        this.projectList = data.projects;
        for (let i = 0; i < this.projectList.length; i++) {
          if (this.projectList[i].status == "in-progress") {
            this.in_progress_amount++;
          } else if (this.projectList[i].status == "completed") {
            this.completed_amount++;
          } else if (this.projectList[i].status == "overdue") {
            this.overdue_amount++;
          }
          // this.getProjectStatus(this.projectList[i].status, this.projectList[i].is_in_progress, this.projectList[i].is_completed, this.projectList[i].is_overdue);
          this.getDate(this.projectList[i].due_date);
        }
        this.total_amount = this.projectList.length;
      }
      else {
        console.log("No data");
      }
    })

    this.projectService
      .getProjectsByOwnerId(this.userService.userInfo?.uid)
      .subscribe((projects) => {
        if (projects != null) {
          this.ownedProjects = projects;
          this.projectList = this.ownedProjects;
        }
      });
  }

  getProjectStatus(status: Status, is_in_progress: boolean, is_completed: boolean, is_overdue: boolean) {
    if (status == "in-progress") {
      is_in_progress = true;
      is_completed = false;
      is_overdue = false;
    } else if (status == "completed") {
      is_in_progress = false;
      is_completed = true;
      is_overdue = false;
    } else if (status == "overdue") {
      is_in_progress = false;
      is_completed = false;
      is_overdue = true;
    }
  }

  getDate(date: any) {
    let d = date;
    // let arr = d.split("T");
    // date = arr[0];
  }

  deleteProjectEvent(project: any) {
    this.projectList.forEach((p) => {
      if (p.project_id === project.project_id) {
        this.projectList.splice(this.projectList.indexOf(p), 1);
      }
    });
  }
}
