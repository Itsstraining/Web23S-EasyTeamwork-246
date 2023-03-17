import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { InvitationComponent } from '../components/invitation/invitation.component';
import { FormsModule } from '@angular/forms';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { MemberComponent } from '../components/member/member.component';
import { ShareProjectComponent } from '../components/share-project/share-project.component';
import { environment } from 'src/environments/environment';


const config: SocketIoConfig = { url:   `https://web23stodotask246-tzczztlxyq-as.a.run.app/`, options: {} };



@NgModule({
  declarations: [
    NavbarComponent,
    InvitationComponent,
    MemberComponent,
    ShareProjectComponent
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
    ShareProjectComponent,

    // modules
    MaterialModule,
  ]
})
export class SharedModule { }
