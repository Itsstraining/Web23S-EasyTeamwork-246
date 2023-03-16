import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProjectModel } from 'src/models/projects.model';
import {COMMA, ENTER} from '@angular/cdk/keycodes';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.scss']
})
export class MemberComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<MemberComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProjectModel
  ) {
    console.log(data);
  }

  emailControl = new FormControl('', [Validators.required, Validators.email]);
  tempProject: any;
  separatorKeysCodes: number[] = [ENTER, COMMA];

  ngOnInit(): void {}

  onCloseDialog(): void {
    this.dialogRef.close();
  }

  addInvite() {
    console.log(this.emailControl.value);
    this.dialogRef.close(this.emailControl.value);
  }
}
