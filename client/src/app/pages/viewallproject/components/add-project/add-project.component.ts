import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ProjectService } from 'src/app/services/projects/project.service';
import { UserService } from 'src/app/services/users/user.service';
import { ProjectModel } from 'src/models/projects.model';
import { UserModel } from 'src/models/user.model';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.scss']
})
export class AddProjectComponent {
  owner_id!: string;
  projectName!: string;
  currentUser!: UserModel;
  due_date!: Date;

  options: UserModel[] = [];
  members: UserModel[] = [];

  tagsMember: Set<string> = new Set<string>();

  constructor(
    public dialogRef: MatDialogRef<AddProjectComponent>,
    public userService: UserService,
    public projectService: ProjectService
  ) {
    // this.userService.getAllUser().subscribe((users) => {
    //   users.forEach((user) => {
    //     if (user.uid !== this.userService.userInfo.uid) {
    //       this.options.push(user);
    //     }
    //   });
    // });
    // this.userService.getUserById(this.userService.userInfo.uid).subscribe((users) => {
    //   this.currentUser = users;
    // });
  }

  addProject() {
    let newProject: ProjectModel ={
      project_id: Date.now().toString(),
      name: this.projectName,
      owner: this.userService.userInfo.displayName,
      owner_id: this.userService.userInfo.uid,
      members: [],
      disable: false,
      due_date: this.due_date,
      status: 'in-progress',
      marked: false,

      is_in_progress: true,
      is_completed: false,
      is_overdue: false,
    };

    this.projectService.create(newProject).subscribe(
      (res) => {
        window.alert('Project created successfully!!');
      },
    );
    console.log(newProject);
    this.dialogRef.close(newProject);
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
