import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SocketTestComponent } from './socket-test.component';

const routes: Routes = [{ path: '', component: SocketTestComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SocketTestRoutingModule { }
