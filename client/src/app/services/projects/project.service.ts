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
  public idParam!: string;

  getAllProject(){
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

  getProjectById(id: string){
    return this.httpClient.get(`${this.url}/getProjectById/${id}`) as Observable<ProjectModel>;
  }

  createProject(project: ProjectModel){
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

  updateProject(project: ProjectModel, id: string){
    return this.httpClient.put(`${this.url}/updateProject?id=${id}`, project);
  }

  deleteProject(id: string){
    return this.httpClient.delete(`${this.url}/deleteProject?id=${id}`);
  }
}
