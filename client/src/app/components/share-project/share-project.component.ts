import { Component, OnInit, ElementRef, ViewChild, InputDecorator } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ProjectService } from 'src/app/services/projects/project.service';
import { UserService } from 'src/app/services/users/user.service';
import { InvitationModel } from 'src/models/invitation.model';
import { ProjectModel } from 'src/models/projects.model';
import { Timestamp } from 'firebase/firestore';
import { UserModel } from 'src/models/user.model';
import { Store } from '@ngrx/store';
import { UserState } from 'src/NgRx/States/user.state';
import { InvitationState } from 'src/NgRx/States/invitations.state';
import { ProjectState } from 'src/NgRx/States/projects.state';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import * as UserActions from '../../../NgRx/Actions/user.action'
import * as ProjectActions from '../../../NgRx/Actions/projects.action'
import { InvitationActions } from 'src/NgRx/Actions/invitations.action';

@Component({
  selector: 'app-share-project',
  templateUrl: './share-project.component.html',
  styleUrls: ['./share-project.component.scss']
})
export class ShareProjectComponent implements OnInit {

  id!: string;
  idParam!: string | null;
  projectName!: string;
  users$!: Observable<UserState>;
  user!: UserModel;
  invites$!: Observable<InvitationState>
  projects$!: Observable<ProjectState>
  allItems: Array<UserModel> = [];
  filterItem: UserModel[] = [];
  currentProject!: ProjectModel;
  isInvited!: boolean;

  constructor(
    public dialogRef: MatDialogRef<ShareProjectComponent>,
    private userService: UserService,
    private store: Store<{ user: UserState, invitation: InvitationState, project: ProjectState }>,
    private route: ActivatedRoute,
    private projectService: ProjectService
  ) {
    // this.route.params.subscribe(param => {
      // console.log(param['id']);
      // this.idParam = param['id'];
      // console.log(this.idParam)
      // this.projectService.idParam = param['id'];
      console.log(this.projectService.idParam);
    // });

    this.projects$ = this.store.select('project');
    // this.users$ = this.store.select('auth');
    this.invites$ = this.store.select('invitation');
    this.projects$.subscribe((data) => {
      console.log(data.project);
      this.currentProject = data.project!;
      console.log(this.currentProject);
      this.projectName = this.currentProject.name;
      console.log(this.projectName);
    })

    this.users$ = this.store.select('user');

  }
  ngOnInit(): void {
    console.log(this.users$);
    this.store.dispatch(ProjectActions.getByProjectId({ project_id: this.projectService.idParam! }));
    this.projects$.subscribe((dataproject) => {
      console.log(dataproject);
    })
    this.store.dispatch(UserActions.getAllUsers());
    this.users$.subscribe((data) => {
      this.id = data.user?.uid ?? '';
      this.user = data.user!;
      if (data.users != null && data.users.length != 0) {
        this.allItems = data.users;
        this.filterItem = data.users;
      }
    })
  }

  sendInvite(receiver: UserModel) {
    let index = this.currentProject.members.findIndex((res) => res.uid == receiver.uid);
    if (index == -1) {
      console.log(this.projectService.idParam);
      if (this.projectService.idParam != null) {
        let invitation: InvitationModel = {
          id: Timestamp.now().toMillis().toString(),
          from: this.user.uid!,
          name: this.user.displayName!,
          to: receiver.uid!,
          status: 'pending',
          project_id: this.projectService.idParam,
          project_name: this.projectName,
        }
        console.log(invitation);
        this.store.dispatch(InvitationActions.createInvitation({ invitation: invitation, idReceiver: receiver.uid! }));
      }
    } else {
      return;
    }
  }
}
