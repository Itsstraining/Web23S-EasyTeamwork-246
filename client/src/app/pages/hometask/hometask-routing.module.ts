import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HometaskComponent } from './hometask.component';

const routes: Routes = [{ path: '', component: HometaskComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HometaskRoutingModule { }
