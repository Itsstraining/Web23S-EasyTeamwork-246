import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { InvitationComponent } from '../components/invitation/invitation.component';
import { FormsModule } from '@angular/forms';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { MemberComponent } from '../components/member/member.component';


const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };



@NgModule({
  declarations: [
    NavbarComponent,
    InvitationComponent,
    MemberComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    SocketIoModule.forRoot(config),
  ],
  exports:[
    // components
    NavbarComponent,
    InvitationComponent,
    MemberComponent,

    // modules
    MaterialModule,
  ]
})
export class SharedModule { }
