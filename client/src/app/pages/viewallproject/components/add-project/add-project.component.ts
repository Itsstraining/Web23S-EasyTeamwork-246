import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.scss']
})
export class AddProjectComponent {
  constructor(
    public dialogRef: MatDialogRef<AddProjectComponent>,
    ) { }

  addProject(){

  }

  closeDialog(){
    this.dialogRef.close();
  }
}
