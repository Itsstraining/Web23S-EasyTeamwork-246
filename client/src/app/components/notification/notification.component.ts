import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { UserService } from 'src/app/services/users/user.service';
import { NotificationModel } from 'src/models/notification.model';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  notis: NotificationModel[] = [];

  constructor(
    public dialogref: MatDialogRef<NotificationComponent>,
    private notificationService: NotificationService,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.notificationService.getNotificationByUserId(this.userService.user.uid).subscribe(notifications => {
      if(notifications) {
        this.notis = notifications.reverse();
      }else{
        this.notis = [];
      }
    });
  }
}
