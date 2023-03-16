import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewallprojectRoutingModule } from './viewallproject-routing.module';
import { ViewallprojectComponent } from './viewallproject.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddProjectComponent } from './components/add-project/add-project.component';
import { ShareProjectComponent } from '../../components/share-project/share-project.component';


@NgModule({
  declarations: [
    ViewallprojectComponent,
    AddProjectComponent,
    ShareProjectComponent
  ],
  imports: [
    CommonModule,
    ViewallprojectRoutingModule,
    SharedModule
  ]
})
export class ViewallprojectModule { }
