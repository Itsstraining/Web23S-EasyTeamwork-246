import { Component} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddProjectComponent } from './components/add-project/add-project.component';



@Component({
  selector: 'app-viewallproject',
  templateUrl: './viewallproject.component.html',
  styleUrls: ['./viewallproject.component.scss']
})
export class ViewallprojectComponent {
  constructor(private matDialog: MatDialog ){ }
  dialogOpen(){
    this.matDialog.open(AddProjectComponent)
  }
}