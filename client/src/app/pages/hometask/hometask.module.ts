import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HometaskRoutingModule } from './hometask-routing.module';
import { HometaskComponent } from './hometask.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { TaskInfoComponent } from './components/task-info/task-info.component';
import { TaskCardComponent } from './components/task-card/task-card.component';


@NgModule({
  declarations: [
    HometaskComponent,
    AddTaskComponent,
    TaskInfoComponent,
    TaskCardComponent
  ],
  imports: [
    CommonModule,
    HometaskRoutingModule,
    SharedModule,
  ]
})
export class HometaskModule { }
