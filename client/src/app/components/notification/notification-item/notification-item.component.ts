import { Component, Input, OnInit } from '@angular/core';
import { NotificationModel } from 'src/models/notification.model';

@Component({
  selector: 'app-notification-item',
  templateUrl: './notification-item.component.html',
  styleUrls: ['./notification-item.component.scss']
})
export class NotificationItemComponent implements OnInit {
  @Input() noti!: NotificationModel;

  constructor() { }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
}
