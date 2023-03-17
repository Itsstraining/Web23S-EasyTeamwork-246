import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'src/app/services/users/user.service';
import { InvitationModel } from 'src/models/invitation.model';
import { UserState } from 'src/NgRx/States/user.state';
import { InvitationActions } from 'src/NgRx/Actions/invitations.action';
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
    private store: Store<{ invitation: InvitationState; user: UserState }>
  ) {
    this.auth$.subscribe((auth) => {
      this.userUid = auth.user?.uid ?? '';
    })
    this.invites$ = this.store.select('invitation');
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
