import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Project, ProjectDocument } from 'src/schemas/projects.schema';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<ProjectDocument>,
  ) { }

  async getAllProject(): Promise<Project[]> {
    try {
      let data = await this.projectModel.find().exec();
      return data;
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  async getProjectById(id: string):Promise<Project|null>{
    try {
      return await this.projectModel.findOne({ project_id: id }).exec() as Project;
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  async createProject(project: Project) {
    try {
      const createdProject = new this.projectModel(project);
      return createdProject.save();
    } catch (error) {
      return null;
    }
  }

  async updateProject(project: Project, id: string) {
    try {
      return await this.projectModel.findOneAndUpdate({ project_id: id }, project);
    } catch (e) {
      console.log("error: " + e);
      return null;
    }
  }

  async deleteProject(id: string) {
    try {
      this.projectModel.deleteOne({ project_id: id }).exec();
    } catch (e) {
      console.log(e);
      return null;
    }
  }
}