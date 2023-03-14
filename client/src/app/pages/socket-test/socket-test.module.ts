import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SocketTestRoutingModule } from './socket-test-routing.module';
import { SocketTestComponent } from './socket-test.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { FormsModule } from '@angular/forms';

export const config: SocketIoConfig = { url: 'http://localhost:3000', options:{}};

@NgModule({
  declarations: [
    SocketTestComponent
  ],
  imports: [
    CommonModule,
    SocketTestRoutingModule,
    SocketIoModule.forRoot(config),
    FormsModule,
  ]
})
export class SocketTestModule { }
