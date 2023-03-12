import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ProjectService } from 'src/app/services/projects/project.service';
import { ProjectModel } from 'src/models/projects.model';

@Component({
  selector: 'app-share-project',
  templateUrl: './share-project.component.html',
  styleUrls: ['./share-project.component.scss']
})
export class ShareProjectComponent {
  constructor( public dialogRef: MatDialogRef<ShareProjectComponent>, private projectService: ProjectService) { }

  // userInput = this.projectService.getAll();

  shareProject(){}

  closeDialogShare(){
    this.dialogRef.close();
  }

  showAccountGG(){
    
  }
}
