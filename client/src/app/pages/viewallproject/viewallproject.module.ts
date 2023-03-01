import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewallprojectRoutingModule } from './viewallproject-routing.module';
import { ViewallprojectComponent } from './viewallproject.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    ViewallprojectComponent
  ],
  imports: [
    CommonModule,
    ViewallprojectRoutingModule,
    SharedModule
  ]
})
export class ViewallprojectModule { }
