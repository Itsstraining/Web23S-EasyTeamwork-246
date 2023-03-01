import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HometaskRoutingModule } from './hometask-routing.module';
import { HometaskComponent } from './hometask.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    HometaskComponent
  ],
  imports: [
    CommonModule,
    HometaskRoutingModule,
    SharedModule
  ]
})
export class HometaskModule { }
