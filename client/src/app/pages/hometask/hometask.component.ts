import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TaskModel } from 'src/models/todo.model';
import { AddTaskComponent } from './components/add-task/add-task.component';

@Component({
  selector: 'app-hometask',
  templateUrl: './hometask.component.html',
  styleUrls: ['./hometask.component.scss']
})
export class HometaskComponent {

  constructor(private matDialog: MatDialog) { }

  todoMenu: boolean = true;

  dialogOpen() {
    this.matDialog.open(AddTaskComponent)
  }

  todoList: TaskModel[] = [
    {
      title: "Task1",
      description: "des 1",
      deadline: "12 March 2023",
      commentCount: 2,
    }, {
      title: "Task12",
      description: "des 2",
      deadline: "5 March 2023",
      commentCount: 2,
    }, {
      title: "Task10",
      description: "des 22",
      deadline: "5 March 2023",
      commentCount: 2,
    }
  ];

  inProgressList: TaskModel[] = [
    {
      title: "Task2",
      description: "des 3",
      deadline: "12 March 2023",
      commentCount: 2,
    },
    {
      title: "Task3",
      description: "des 4",
      deadline: "5 March 2023",
      commentCount: 2,
    }, {
      title: "Task11",
      description: "des 23",
      deadline: "5 March 2023",
      commentCount: 2,
    }
  ];

  completeList: TaskModel[] = [
    {
      title: "Task4",
      description: "des 5",
      deadline: "12 March 2023",
      commentCount: 2,
    },
    {
      title: "Task5",
      description: "des 6",
      deadline: "5 March 2023",
      commentCount: 2,
    }, {
      title: "Task15",
      description: "des 54",
      deadline: "5 March 2023",
      commentCount: 2,
    }
  ];
  
  dueList: TaskModel[] = [
    {
      title: "Task6",
      description: "des 7",
      deadline: "12 March 2023",
      commentCount: 2,
    },
    {
      title: "Task7",
      description: "des 8",
      deadline: "5 March 2023",
      commentCount: 2,
    }
  ];


  drop(event: CdkDragDrop<TaskModel[]>){
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  todoMenuEdit() {

  }

  todoMenuDelete() {

  }
}
