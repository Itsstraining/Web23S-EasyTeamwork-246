import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { async } from 'rxjs';
import { ProjectModel } from 'src/models/projects.model';
import { Project, ProjectDocument } from 'src/schemas/projects.schema';

@Injectable()
export class ProjectsService {
    constructor(@InjectModel(Project.name) private projectModel: Model<ProjectDocument>) { }

    async getAll(): Promise<Project[]> {
        try{
            let data = await this.projectModel.find({}).exec();
            return data;
        }catch(e){
            console.log(e);
            return null;
        }
    }

    async getById(id: string) {
        try{
            let data = await this.projectModel.find({project_id: id}).exec();
            return data;
        }catch(e){
            console.log(e);
            return null;
        }
    }

    async create(newProject: ProjectModel) {
        try{
            let data = await this.projectModel.create(newProject);
            return data;
        }catch(e){
            console.log(e);
            return null;
        }
    }

    async update(project: ProjectModel, id: string) {
        try{
            console.log(project);
            return await this.projectModel.findOneAndUpdate({project_id: id}, project);
        }catch(e){
            console.log("error: " + e);
            return null;
        }
    }

    async delete(id: string) {
        try{
            this.projectModel.deleteOne({project_id: id}).exec();
        }catch(e){
            console.log(e);
            return null;
        }
    }
}