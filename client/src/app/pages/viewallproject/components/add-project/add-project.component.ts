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
  projectName!: string;
  currentUser!: UserModel;
  date!: Date;

  options: UserModel[] = [];
  members: UserModel[] = [];

  tagsMember: Set<string> = new Set<string>();

  formatDate!: string[];
  due_date!: string;

  currentDate: any = new Date();
  deadline = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), this.currentDate.getDate() + 1);

  constructor(
    public dialogRef: MatDialogRef<AddProjectComponent>,
    public userService: UserService,
    public projectService: ProjectService
  ) {
    this.userService.getAllUser().subscribe((users) => {
      users.forEach((user) => {
        if (user.uid !== this.userService.userInfo.uid) {
          this.options.push(user);
        }
      });
    });
    this.userService.getUserById(this.userService.userInfo.uid).subscribe((users) => {
      this.currentUser = users;
    });
  }

  addProject() {
    this.formatDateFunc(this.date);
    let newProject: ProjectModel ={
      project_id: Date.now().toString(),
      name: this.projectName,
      owner: this.userService.userInfo.displayName,
      owner_photo: this.userService.userInfo.photoURL,
      owner_id: this.userService.userInfo.uid,
      members: [
        {
          uid: this.userService.userInfo.uid,
          displayName: this.userService.userInfo.displayName,
          photoURL: this.userService.userInfo.photoURL,
          email: this.userService.userInfo.email,
        },
        {
          uid: "VuGLwl674aU6cqCCVPaCyk4oUYB2",
          displayName: "Viper",
          photoURL: "https://lh3.googleusercontent.com/a/AGNmyxbZuFwso9pqtKexivewOigb33zrX1Mn6ECDGmiK=s96-c",
          email: "vipergtsr323@gmail.com",
        }
      ],
      disable: false,
      due_date: this.due_date,
      status: 'in-progress',
      marked: false,
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

  formatDateFunc(date: Date) {
    this.formatDate = date.toString().split(' ');
    switch (this.formatDate[1]) {
      case 'Jan':
        this.formatDate[1] = '01';
        break;
      case 'Feb':
        this.formatDate[1] = '02';
        break;
      case 'Mar':
        this.formatDate[1] = '03';
        break;
      case 'Apr':
        this.formatDate[1] = '04';
        break;
      case 'May':
        this.formatDate[1] = '05';
        break;
      case 'Jun':
        this.formatDate[1] = '06';
        break;
      case 'Jul':
        this.formatDate[1] = '07';
        break;
      case 'Aug':
        this.formatDate[1] = '08';
        break;
      case 'Sep':
        this.formatDate[1] = '09';
        break;
      case 'Oct':
        this.formatDate[1] = '10';
        break;
      case 'Nov':
        this.formatDate[1] = '11';
        break;
      case 'Dec':
        this.formatDate[1] = '12';
        break;
    }
    this.due_date = this.formatDate[1] + '/' + this.formatDate[2] + '/' + this.formatDate[3];
  }
}
