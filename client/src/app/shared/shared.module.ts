import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { InvitationComponent } from '../components/invitation/invitation.component';
import { InvitationItemComponent } from '../components/invitation/invitation-item/invitation-item.component';
import { NotificationComponent } from '../components/notification/notification.component';
import { NotificationItemComponent } from '../components/notification/notification-item/notification-item.component';


@NgModule({
  declarations: [
    NavbarComponent,
    InvitationComponent,
    InvitationItemComponent,
    NotificationComponent,
    NotificationItemComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports:[
    // components
    NavbarComponent,
    InvitationComponent,
    InvitationItemComponent,
    NotificationComponent,
    NotificationItemComponent,

    // modules
    MaterialModule
  ]
})
export class SharedModule { }
