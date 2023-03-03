import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatMenuModule} from '@angular/material/menu';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatButtonToggleModule,
    DragDropModule,
    MatMenuModule,
  ],
  exports:[
    MatToolbarModule,
    MatButtonModule,
    MatButtonToggleModule,
    DragDropModule,
    MatMenuModule,
  ]
})
export class MaterialModule { }
