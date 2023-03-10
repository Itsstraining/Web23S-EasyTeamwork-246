import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ProjectModel } from 'src/models/projects.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private httpClient: HttpClient) { }

  url = `${environment.baseURL}projects`;

  getAll(){
    return  this.httpClient.get(`${this.url}/getAllProjects`);
  }

  getById(id: string){
    return this.httpClient.get(`${this.url}/getProjectById?=${id}`);
  }

  create(project: ProjectModel){
    return this.httpClient.post(`${this.url}/createProject`, project);
  }

  update(project: ProjectModel, id: string){
    return this.httpClient.put(`${this.url}/updateProject?=${id}`, project);
  }

  delete(id: string){
    return this.httpClient.delete(`${this.url}/deleteProject?=${id}`);
  }
}
