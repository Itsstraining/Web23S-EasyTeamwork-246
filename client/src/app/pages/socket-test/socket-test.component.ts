import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { TaskService } from 'src/app/services/tasks/task.service';
import { TestModel } from 'src/models/test.modle';

@Component({
  selector: 'app-socket-test',
  templateUrl: './socket-test.component.html',
  styleUrls: ['./socket-test.component.scss']
})
export class SocketTestComponent {
  title = 'socket-test';

  constructor(private taskService: TaskService){}

  test$!: Observable<any>;
  tests: TestModel[] = [];
  test_id: string = 'test_01';
  test_content !: string;

  getTests(){
    console.log("Already join in prj: ", this.test_id);
    this.test$ = this.taskService.getTest(this.test_id);
    this.test$.subscribe( (data: any) => {
      console.log(data);
      this.tests.push(data);
    })
  }

  sendTest(content: string){
    let newTest: TestModel = {
      test_id: this.test_id,
      test_content: content,
    };
    this.taskService.sendTest(newTest);
    // this.iterate++;
  }
}
