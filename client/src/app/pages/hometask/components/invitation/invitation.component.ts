import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { InvitationService } from 'src/app/services/invitation/invitation.service';
import { NotificationService } from 'src/app/services/notification/notification.service';

import { ProjectService } from 'src/app/services/projects/project.service';
import { UserService } from 'src/app/services/users/user.service';
import { InvitationModel } from 'src/models/invitation.model';
import { NotificationModel } from 'src/models/notification.model';
import { ProjectModel } from 'src/models/projects.model';
import { UserModel } from 'src/models/user.model';

@Component({
  selector: 'app-invitation',
  templateUrl: './invitation.component.html',
  styleUrls: ['./invitation.component.scss']
})
export class InvitationComponent implements OnInit {
  @Input() invitation!: InvitationModel;
  @Output() repliedInvitationEvent: EventEmitter<InvitationModel> = new EventEmitter<InvitationModel>();
  sender!: UserModel
  currentUser!: UserModel;
  tempProject!: ProjectModel;

  constructor(
    private userService: UserService,
    private invitationService: InvitationService,
    private projectService: ProjectService,
    private notificationService: NotificationService,
    ) { }

  ngOnInit(): void {
    this.userService.getUserById(this.invitation.owner_id).subscribe(user => {
      this.sender = user;
    });
    this.userService.getUserById(this.userService.user.uid).subscribe(user => {
      this.currentUser = user;
    });
    // this.projectService.getAll(this.invitation.project_id).subscribe(
    //   project => {
    //     this.tempProject = project;
    //   }
    // );
  }

  replyInvitation(isAgree: number) {
    this.invitation.status =  isAgree;

    // this.projectService.getAll(this.tempProject.project_id).subscribe((res) => {
    //   if(res.disabled){
    //     window.alert('Project no longer exists!!');
    //     return;
    //   }
    // });
    this.invitationService.updateInvitationById(this.invitation.id, this.invitation).subscribe(
      invitation => {
        this.invitationService.deleteInvitationById(this.invitation.id).subscribe(
          invitation => {
            window.alert('Invitation has been replied');
            this.repliedInvitationEvent.emit(this.invitation);
          }
        );
      }
    );
    this.addMemToProject(isAgree);
  }

  addMemToProject(isAgree: number) {
    if(isAgree == 1) {
      this.tempProject.members.push(this.currentUser);

      // this.projectService.update(this.invitation.project_id, this.tempProject).subscribe(
      //   invitation => {
      //     window.alert('Member has been added to project');
      //   }
      // );
      this.createNotification(isAgree);
    }
  }

  createNotification(isAgree: number) {
    let noti: NotificationModel = {
      id: '',
      owner_id: this.userService.user.uid,
      receiver_id: this.sender.uid,
      invitation_id: Date.now().toString(),
      status: 0,
      unread: true
    };
    if(isAgree == 1) {
       noti.status = 1;
    }
    this.notificationService.createNoti(noti).subscribe(
      notification => {
        window.alert('Notification has been created');
      });
  }
}
