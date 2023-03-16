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
  allFruits: string[] = [];
  fruits: string[] = [];
  filteredFruits!: Observable<string[]>;

  @ViewChild('fruitInput') fruitInput!: ElementRef<HTMLInputElement>;

  // @ViewChild('memberInput', {read: ElementRef})
  // memberInput!: ElementRef<HTMLInputElement>;

  constructor(
    private store: Store<{task: TaskModel}>,
    public dialogRef: MatDialogRef<AddTaskComponent>,
  ) {
    this.taskById$ = this.store.select('task');

    this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => (fruit ? this._filter(fruit) : this.allFruits.slice())),
    );
   }


  ngOnInit(): void {
    // this.temp = this.task;
    this.temp.assignee = this.task.assignee;
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
      map((fruit: string | null) => (fruit ? this._filter(fruit) : this.allFruits.slice())),
    );
  }

  getDate(){
    this.getMemberName();
    const date = new Date();

    return date.toLocaleDateString();
  }

  updateTask(){
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
    for(let i = 0; i < this.project.members.length; i++){
      this.allFruits.push(this.project.members[i].displayName);
    }
    console.log(this.allFruits);
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.fruits.push(value);
    }
    event.chipInput!.clear();

    this.fruitCtrl.setValue(null);
  }

  remove(fruit: string): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.fruits.push(event.option.viewValue);
    this.fruitInput.nativeElement.value = '';
    this.fruitCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allFruits.filter(fruit => fruit.toLowerCase().includes(filterValue));
  }
}

type Mutable<Type> = {
  -readonly [Key in keyof Type]: Type[Key];
};
