import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { UserService } from 'src/app/services/users/user.service';
import { ProjectModel } from 'src/models/projects.model';
import { AddProjectComponent } from './components/add-project/add-project.component';
import * as ProjectActions from '../../../NgRx/Actions/projects.action';
import { ProjectService } from 'src/app/services/projects/project.service';
import { InvitationActions } from 'src/NgRx/Actions/invitations.action';
import { MemberComponent } from 'src/app/components/member/member.component';
import { map, Observable, Subject, Subscription } from 'rxjs';
import { UserState } from 'src/NgRx/States/user.state';
import { ProjectState } from 'src/NgRx/States/projects.state';
import { UserModel } from 'src/models/user.model';
import { InvitationComponent } from 'src/app/components/invitation/invitation.component';
import { InvitationState } from 'src/NgRx/States/invitations.state';

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
    private store: Store<{ project: ProjectState,user: UserState; invite: InvitationState}>
  ) {
    this.project$ = this.store.select('project');


    this.auth$.subscribe((auth) => {
      if(auth.loading == false){
        this.userUid = auth.user?.uid !;
      }
    });

    this.invites$ = this.store.select('invite');
    this.store.dispatch(
      InvitationActions.getInvitations({ idReceiver: this.userUid })
    );
    this.invites$.subscribe((invites) => {
      let count = 0;
      invites.invitations.forEach((invite) => {
        if (invite.status == 'pending') {
          count++;
        }
      });
      this.invitesCount = count;
    });
  }

  project$ !: Observable<any>;

  projectList: ProjectModel[] = [];
  ownedProjects: ProjectModel[] = [];

  isSharedProjects: string = '0';

  in_progress_list: ProjectModel[] = [];
  completed_list: ProjectModel[] = [];
  overdue_list: ProjectModel[] = [];
  mark_list: ProjectModel[] = [];


  user: UserModel = <UserModel>{};
  userUid!: string;
  auth$ = this.store.select('user');
  invites$!: Observable<InvitationState>;
  invitesCount = 0;

  dialogOpen() {
    let addProjectDialog = this.matDialog.open(AddProjectComponent, {
      data: {
        owner_id: this.userService.userInfo.uid,
      }, autoFocus: false
    })

    addProjectDialog.afterClosed().subscribe(() => {
      this.ngOnInit();
    })
  }

  ngOnDestroy(): void {
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
  }

  openInvitation(){
    this.matDialog.open(InvitationComponent);
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
        console.log("Project List: ", this.projectList);
        // Get owned projects
        this.ownedProjects = this.projectList.filter((project) => {
          for (let i = 0; i < project.members.length; i++) {
            if (project.members[i].uid == this.userService.userInfo.uid) {
              return true;
            }
          }
          return false;
        });

        this.ownedProjects.reverse();

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

    this.projectService.updateProject(updateProject, project.project_id).subscribe(() => {
      this.getAllProject();
    });
  }

  deleteProject(project_id: string) {
    this.projectService.deleteProject(project_id).subscribe((data) => {
      console.log("Delete project", data);
      this.ngOnInit();
    });
  }

  changeStatus() {
    this.store.dispatch(ProjectActions.getAllProjects());
    this.project$.subscribe((data) => {
      let List: ProjectModel[] = data.projects;
      let projectList: ProjectModel[] = List.filter((project) => {
        for (let i = 0; i < project.members.length; i++) {
          if (project.members[i].uid == this.userService.userInfo.uid) {
            return true;
          }
        }
        return false;
      });

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
              console.log("Change to Overdue");
              status = "overdue";
            }
            else {
              console.log("Status stay");
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

        let upProject: ProjectModel = {
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

        this.projectService.updateProject(upProject, projectList[i].project_id).subscribe();
      }
    });
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
}
