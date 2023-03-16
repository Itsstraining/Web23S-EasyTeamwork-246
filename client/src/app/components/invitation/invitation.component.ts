import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';
import { InvitationService } from 'src/app/services/invitation/invitation.service';
import { UserService } from 'src/app/services/users/user.service';
import { InvitationModel } from 'src/models/invitation.model';
import { UserModel } from 'src/models/user.model';
import { ProjectState } from 'src/NgRx/States/projects.state';
import { UserState } from 'src/NgRx/States/user.state';
import { InvitationActions } from 'src/NgRx/Actions/invitations.action';
import { ProjectModel } from 'src/models/projects.model';


@Component({
  selector: 'app-invitation',
  templateUrl: './invitation.component.html',
  styleUrls: ['./invitation.component.scss']
})
export class InvitationComponent implements OnInit {

  invitations: InvitationModel[] = [];
  countUnReadInvitations: number = 0;

  constructor(
    public dialogref: MatDialogRef<InvitationComponent>,
    private invitationService: InvitationService,
    private userService: UserService,
    private store: Store<{ project: ProjectState; user: UserState }>
  ) { }

  ngOnInit(): void {
    // this.invitations = this.invitationService.invitations;
    this.acceptedSubscription = this.isAccepted$.subscribe((state) => {
      if (state) {
        if (this.user.uid != '' || this.user.uid != undefined) {
          console.log('accepted');
          this.store.dispatch(InvitationActions.findRequest({ _id: this.user.uid }));
        }
      }
    });
    this.userSubscription = this.userState$.subscribe((state) => {
      if (state.loading == false) {
        if (state.user?.uid) {
          console.log(state.user.displayName);
          this.user = state.user;
        }
      }
    });
  }
  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
    this.acceptedSubscription.unsubscribe();
  }

  // getUnReadInvitations(){
  //   console.log('go')
  //   this.invitationService.invitations.forEach(invitation => {
  //     if(invitation.unread){
  //       invitation = {...invitation, unread: false};
  //       this.invitationService.countUnReadInvitations--;
  //       this.invitationService.updateInvitationById(invitation.id, invitation);
  //     }
  //   });
  //   console.log(this.invitationService.invitations)
  // }


  // declinedInvitationEvent(event: any){
  //   this.invitations.splice(this.invitations.indexOf(event), 1);
  // }


  userSubscription!: Subscription;
  userState$ = this.store.select('user');
  user: UserModel = <UserModel>{};
  acceptedSubscription !: Subscription;
  projectState = this.store.select('project');
  requestProject$ = this.store.select('project', 'requestProject');
  isAccepted$ = this.store.select('project', 'isAccepted');

  acceptInvitation(project: ProjectModel) {
    if (this.user.uid != '' || this.user.uid != undefined) {
      this.store.dispatch(
        InvitationActions.acceptRequest({
          _id: this.user.uid,
          project: project,
        })
      );
    } else {
      console.log('errorr')
      return;
    }
  }
}
