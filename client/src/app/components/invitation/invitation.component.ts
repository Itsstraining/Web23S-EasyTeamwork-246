import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'src/app/services/users/user.service';
import { InvitationModel } from 'src/models/invitation.model';
import { UserModel } from 'src/models/user.model';
import { ProjectState } from 'src/NgRx/States/projects.state';
import { UserState } from 'src/NgRx/States/user.state';
import { InvitationActions } from 'src/NgRx/Actions/invitations.action';
import { ProjectModel } from 'src/models/projects.model';
import { InvitationState } from 'src/NgRx/States/invitations.state';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-invitation',
  templateUrl: './invitation.component.html',
  styleUrls: ['./invitation.component.scss']
})
export class InvitationComponent implements OnInit {

  auth$ = this.store.select('user');
  invites$!: Observable<InvitationState>;
  invites: InvitationModel[] = [];
  userUid!: string;

  constructor(
    public dialogref: MatDialogRef<InvitationComponent>,
    private userService: UserService,
    private store: Store<{ invite: InvitationState; user: UserState }>
  ) {
    this.auth$.subscribe((auth) => {
      this.userUid = auth.user?.uid ?? '';
      console.log(auth.user);
    })
    this.invites$ = this.store.select('invite');
    this.store.dispatch(InvitationActions.getInvitations({ idReceiver: this.userUid }));
    this.invites$.subscribe((res) => {
      console.log(res.invitations)
    })
  }

  ngOnInit(): void {

  }
  ngOnDestroy(): void {
  }

  acceptInvitation(idProject:string, idReciever:string, idInvitation:string, invitation: InvitationModel){
    this.store.dispatch(InvitationActions.acceptInvitation({idProject, idReceiver: idReciever, idInvitation, invitation}));
  }

  declineInvitation(idInvitation:string){
    this.store.dispatch(InvitationActions.declineInvitation({idInvitation}));
  }
}
