import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewallprojectComponent } from './viewallproject.component';

const routes: Routes = [{ path: '', component: ViewallprojectComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewallprojectRoutingModule { }
