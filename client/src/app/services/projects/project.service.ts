import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ProjectModel } from 'src/models/projects.model';
import { map, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private httpClient: HttpClient) { }

  url = `${environment.baseURL}projects`;

  getAll(){
    return  this.httpClient.get(`${this.url}/getAllProjects`);
  }

  getAllByUserId(_id: string): Observable<ProjectModel[]> {
    let projects = this.httpClient.get(`${this.url}/all/user/${_id}`).pipe(
      map((projects) => {
        return <ProjectModel[]>projects;
      })
    );
    return projects;
  }

  getById(id: string){
    return this.httpClient.get(`${this.url}/getProjectById?id=${id}`);
  }

  create(project: ProjectModel){
    let response = this.httpClient
      .post(`${this.url}/createProject`, project, {
        headers: new HttpHeaders({
          authorization: '',
        }),
      })
      .pipe(
        map((project) => {
          return <ProjectModel>project;
        })
      );
    return response;
  }

  update(project: ProjectModel, id: string){
    return this.httpClient.put(`${this.url}/updateProject?id=${id}`, project);
  }

  delete(id: string){
    return this.httpClient.delete(`${this.url}/deleteProject?id=${id}`);
  }

  invite(email: string, project: ProjectModel) {
    return this.httpClient.put(`${this.url}/invite/${email}`, project, {
      headers: new HttpHeaders({
        authorization: '',
      }),
    }) as Observable<ProjectModel>;
  }

  findRequestList(_id: string) {
    return this.httpClient.get(`${this.url}/request/${_id}`, {
      headers: new HttpHeaders({
        authorization: '',
      }),
    }) as Observable<ProjectModel[]>;
  }

  acceptRequest(_id: string, project: ProjectModel) {
    return this.httpClient.put(`${this.url}/accept/${_id}`, project, {
      headers: new HttpHeaders({
        authorization: '',
      }),
    }) as Observable<ProjectModel>;
  }
}
