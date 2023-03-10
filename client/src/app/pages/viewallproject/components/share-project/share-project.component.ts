import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-share-project',
  templateUrl: './share-project.component.html',
  styleUrls: ['./share-project.component.scss']
})
export class ShareProjectComponent {
  constructor( public dialogRef: MatDialogRef<ShareProjectComponent> ) { }

  shareProject(){

  }

  closeDialogShare(){
    this.dialogRef.close();
  }
}
