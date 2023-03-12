import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ProjectModel } from 'src/models/projects.model';
import { ProjectService } from '../projects/project.service';

@Injectable({
  providedIn: 'root'
})
export class ShareService {

  constructor(private projectService: ProjectService, private httpClient: HttpClient ) { }


  url = `${environment.baseURL}`;

  getAll(){
    return  this.httpClient.get(`${this.url}/getAllProjects`);
  }

  // showAccountGG(){
  //   // return this.projectModel.members;
  //   // this.projectService.getAll().subscribe(
  //   //   (res: any) => {
  //   //     console.log(res);
        
  //   //   },
  //   //   (err: any) => {
  //   //     console.log(err);
  //   //   }
  //   // );
  // }
  // // if( this.userInput){
  // //   return this.userInput.show();
  // // }
  // // else{
  // //   (err: any) => {
  // //     console.log(err);
  // //   }
  // // }
}
