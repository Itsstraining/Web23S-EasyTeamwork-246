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

  //Dữ liệu tĩnh
  projectList = [
    {
      marked: false,
      project_id: "001",
      name: "E.T Project",
      owner: "Hồ Văn Hiền",
      due_date: new Date(),
      status: "In-progress",
      disable: false,
      members: 10,
    }
  ]
}