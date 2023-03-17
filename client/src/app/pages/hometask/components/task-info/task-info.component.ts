import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ProjectModel } from 'src/models/projects.model';
import { Complexity, Status, TaskModel } from 'src/models/task.model';
import { UserModel } from 'src/models/user.model';
import * as TaskActions from '../../../../../NgRx/Actions/tasks.action';
import { AddTaskComponent } from '../add-task/add-task.component';
import {MatChipEditedEvent, MatChipEditInput, MatChipInput, MatChipInputEvent, MatChipRemove} from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {FormControl} from '@angular/forms';
import {map, startWith} from 'rxjs/operators';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-task-info',
  templateUrl: './task-info.component.html',
  styleUrls: ['./task-info.component.scss']
})

export class TaskInfoComponent implements OnInit{
  taskById$ !: Observable<any>;
  task: TaskModel = {
    task_id: '',
    project_id: '',
    assignee: [],
    name: '',
    description: '',
    status: 'todo',
    complexity: 'easy',
    deadline: '',
    comment_count: 0,
    created_at: '',
    updated_at: ''
  };

  temp: Mutable<TaskModel> = this.task;

  taskName!: string;
  taskDescription!: string;
  taskComplex!: Complexity;
  taskStatus!: Status;
  project!: ProjectModel;

  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];

  fruitCtrl = new FormControl('');
  assigneeTask: UserModel[] = [];
  memberID: UserModel[] = [];
  allMembers: string[] = [];
  member: string[] = [];
  filteredFruits!: Observable<string[]>;

  @ViewChild('fruitInput') fruitInput!: ElementRef<HTMLInputElement>;

  constructor(
    private store: Store<{task: TaskModel}>,
    public dialogRef: MatDialogRef<AddTaskComponent>,
  ) {
    this.taskById$ = this.store.select('task');


   }


  ngOnInit(): void {
    // this.temp = this.task;
    // this.temp.assignee = [];
    this.temp.comment_count = this.task.comment_count;
    this.temp.complexity = this.task.complexity;
    this.temp.created_at = this.task.created_at;
    this.temp.deadline = this.task.deadline;
    this.temp.description = this.task.description;
    this.temp.name = this.task.name;
    this.temp.project_id = this.task.project_id;
    this.temp.status = this.task.status;
    this.temp.task_id = this.task.task_id;
    this.temp.updated_at = this.getDate();

    this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => (fruit ? this._filter(fruit) : this.allMembers.slice())),
    );
  }

  getDate(){
    this.getMemberName();
    const date = new Date();

    return date.toLocaleDateString();
  }

  updateMember(){
    let temp_assignee: Mutable<UserModel>[] = [];
    for(let i = 0; i <= this.member.length; i++){
      this.memberID.forEach((member) => {
        if(this.member[i] == member.displayName){
          temp_assignee.push(member);
        }
      });
    }
    this.temp.assignee = temp_assignee;
    this.store.dispatch(TaskActions.updateTask({task: this.temp, id: this.temp.task_id}));
  }

  updateTask(){
    let temp_assignee: Mutable<UserModel>[] = [];
    for(let i = 0; i <= this.member.length; i++){
      this.memberID.forEach((member) => {
        if(this.member[i] == member.displayName){
          temp_assignee.push(member);
        }
      });
    }
    this.temp.assignee = temp_assignee;
    console.log(this.temp.assignee);
    this.store.dispatch(TaskActions.updateTask({task: this.temp, id: this.temp.task_id}));
    this.closeDialog();
  }

  deleteTask(){
    this.store.dispatch(TaskActions.deleteTask({task_id: this.temp.task_id}));
    this.closeDialog();
  }

  closeDialog(){
    this.dialogRef.close();
  }

  getMemberName(){
    this.member.push(this.project.owner);
    this.project.members.forEach((member) => {
      this.memberID.push(member);
    });
    for(let i = 0; i < this.project.members.length; i++){
      this.allMembers.push(this.project.members[i].displayName);
    }
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.memberID.forEach((member) => {
        if(value == member.displayName){
          this.member.push(value);
        }
      });
    }
    event.chipInput!.clear();

    this.fruitCtrl.setValue(null);
  }

  remove(fruit: string): void {
    const index = this.member.indexOf(fruit);

    if (index >= 0) {
      this.member.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.memberID.forEach((member) => {
      if(event.option.viewValue == member.displayName){
        if(this.member.includes(event.option.viewValue) == false){
          this.member.push(event.option.viewValue);
        }else{
          window.alert(`User ${event.option.viewValue} has already joined this task`);
        }
      }
    });

    this.fruitInput.nativeElement.value = '';
    this.fruitCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allMembers.filter(fruit => fruit.toLowerCase().includes(filterValue));
  }
}

type Mutable<Type> = {
  -readonly [Key in keyof Type]: Type[Key];
};
