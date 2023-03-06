import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent {
  
  

  constructor(
    public dialogRef: MatDialogRef<AddTaskComponent>,
    ) { }

  addTask(){

  }

  closeDialog(){
    this.dialogRef.close();
  }
}
