import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatCardModule} from '@angular/material/card';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {MatMenuModule} from '@angular/material/menu';
import {MatDialogModule} from '@angular/material/dialog';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatButtonToggleModule,
    DragDropModule,
    MatCardModule,
    ScrollingModule,
    MatMenuModule,
    MatDialogModule,
    MatMenuModule,
  ],
  exports:[
    MatToolbarModule,
    MatButtonModule,
    MatButtonToggleModule,
    DragDropModule,
    MatCardModule,
    ScrollingModule,
    MatMenuModule,
    MatDialogModule,
    MatMenuModule,
  ]
})
export class MaterialModule { }
