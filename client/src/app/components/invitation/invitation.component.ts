import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { InvitationService } from 'src/app/services/invitation/invitation.service';
import { UserService } from 'src/app/services/users/user.service';
import { InvitationModel } from 'src/models/invitation.model';


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
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.invitations = this.invitationService.invitations;
  }

  getUnReadInvitations(){
    console.log('go')
    this.invitationService.invitations.forEach(invitation => {
      if(invitation.unread){
        invitation = {...invitation, unread: false};
        this.invitationService.countUnReadInvitations--;
        this.invitationService.updateInvitationById(invitation.id, invitation);
      }
    });
    console.log(this.invitationService.invitations)
  }


  declinedInvitationEvent(event: any){
    this.invitations.splice(this.invitations.indexOf(event), 1);
  }
}
