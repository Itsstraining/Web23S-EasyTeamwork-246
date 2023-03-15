import { Component, OnInit, ElementRef,ViewChild, InputDecorator } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { InvitationService } from 'src/app/services/invitation/invitation.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { ProjectService } from 'src/app/services/projects/project.service';
import { UserService } from 'src/app/services/users/user.service';
import { InvitationModel } from 'src/models/invitation.model';
import { ProjectModel } from 'src/models/projects.model';

import { UserModel } from 'src/models/user.model';
import {MatChipInput, MatChipInputEvent} from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';

@Component({
  selector: 'app-share-project',
  templateUrl: './share-project.component.html',
  styleUrls: ['./share-project.component.scss']
})
export class ShareProjectComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ShareProjectComponent>,
    private userService:UserService,
    private invitationService: InvitationService,
    private notificationService: NotificationService
  ) { }
  ngOnInit(): void {
    this.userService.getAllUser().subscribe((users) => {
      users.forEach((user) => {
        if (user.uid !== this.userService.userInfo.uid) {
          if(this.project.members.find((m) => m.uid === user.uid) == undefined) {
            this.options.push(user);
          }
        }
      });
    });
  }

  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  addOnBlur = true;

  project!: ProjectModel;

  options: UserModel[] = [];
  tagsMembers: Set<string> = new Set<string>();
  members: UserModel[] = [];

  @ViewChild(MatChipInput, { read: ElementRef })
  tagInput!: ElementRef<HTMLInputElement>;

  closeDialogShare() {
    this.dialogRef.close();
  }

  onTagAddMember(mem: UserModel): void {
    if (mem) {
      this.tagsMembers.add(mem.displayName);
      console.log(this.tagsMembers);
      this.members.push(mem);
      this.options = this.options.filter((ops) => ops !== mem);
    }
    this.tagInput.nativeElement.value = '';
  }

  onTagDelete(onTagDelete: MatChipInputEvent){
    this.tagsMembers.delete(onTagDelete.value);
  }

  send() {
    if(this.members.length === 0) {
      window.alert('No member to invitation!!');
      return;
    }
    this.members.forEach((mem) => {
      let invitation: InvitationModel = {
        id: '',
        owner_id: this.userService.user.uid,
        receiver_id: mem.uid,
        status: 0,
        project_id: this.project.project_id,
        unread: true
      }

      this.invitationService.createInvitation(invitation).subscribe(
        (res) => {
          window.alert('Invitation send!!');
        }
      );
      if(this.userService.currentUserInfo.uid !== mem.uid) {
        this.notificationService.notificationsCount++;
        console.log(this.notificationService.notificationsCount);
      }
    });

    this.dialogRef.close();
  }
}
