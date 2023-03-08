import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TaskModel } from 'src/models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private httpClient: HttpClient) { }

  url = `${environment.baseURL}task`;

  getAllTasks(){
    return  this.httpClient.get(`${this.url}`);
  }

  getById(id: string){
    return this.httpClient.get(`${this.url}/ID${id}`);
  }

  create(task: TaskModel){
    return this.httpClient.post(`${this.url}/create`, task);
  }

  update(task: TaskModel, id: string){
    return this.httpClient.put(`${this.url}/update${id}`, task);
  }

  delete(id: string){
    return this.httpClient.delete(`${this.url}/delete${id}`);
  }
}
