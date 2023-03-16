import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Project, ProjectDocument } from 'src/schemas/projects.schema';
import { User, UserDocument } from 'src/schemas/users.schema';

@Injectable()
export class ProjectsService {
    constructor(
        @InjectModel(Project.name) private projectModel: Model<ProjectDocument>,
        @InjectModel(User.name) private userModel: Model<UserDocument>,
    ) { }

    async getAll(): Promise<Project[]> {
        try {
            let data = await this.projectModel.find({}).exec();
            return data;
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    async getAllByUserId(id: string) {
        try {
            let myProjects = await this.projectModel
                .find({ owner_id: id })
                .populate('owner', 'displayName email photoURL', this.userModel)
                .exec();
            let invitedProject = await this.projectModel
                .find({ members: { $eq: Object(id) } })
                .populate('owner', 'displayName email photoURL', this.userModel)
                .exec();
            let projects = [...myProjects, ...invitedProject];
            console.log(`projects length get from user ${id} : ${projects.length}`);
            return projects;
        } catch (error) {
            return null;
        }
    }

    async getById(id: string) {
        try {
            let data = await this.projectModel.find({ project_id: id }).exec();
            return data;
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    async create(project: Project) {
        try {
            const createdProject = new this.projectModel(project);
            return createdProject.save();
        } catch (error) {
            return null;
        }
    }

    async update(project: Project, id: string) {
        try {
            console.log(project);
            return await this.projectModel.findOneAndUpdate({ project_id: id }, project);
        } catch (e) {
            console.log("error: " + e);
            return null;
        }
    }

    async delete(id: string) {
        try {
            this.projectModel.deleteOne({ project_id: id }).exec();
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    async inviteMember(email: string, project: ProjectDocument) {
        try {
          let user = await this.userModel.findOne({ email: email }).exec();
          console.log(`user with email : ${user.email}`);
          if (user == null) {
            return null;
          } else {
            let updateProject = await this.projectModel
              .findOneAndUpdate(
                { project_id: project.project_id },
                { $push: { invitedMembers: user.uid } },
                { new: true },
              )
              .exec();
            return updateProject;
          }
        } catch (error) {
          console.log(error);
          return null;
        }
      }
    
      async acceptRequest(_id: string, project: ProjectDocument) {
        try {
          let user = await this.userModel.findById(_id).exec();
          let newProject = await {
            ...project,
            members: [...project.members, user],
            invitedMembers: project.invitedMembers.filter(
              (_id) => _id != Object(_id),
            ),
          }
          return await this.projectModel.findByIdAndUpdate(project.owner_id, newProject, { new: true }).exec();
        } catch (error) {
          return null;
        }
      }
      async requestJoin(_id: string) {
        try {
          console.log(` requesting liss to join a project for ${_id}`);
          let requestProject = await this.projectModel
            .find({ invitedMembers: { $eq: Object(_id) } })
            .populate('owner', 'displayName email photoURL', this.userModel)
            .sort({ createdAt: -1 })
            .exec();
          return requestProject;
        } catch (error) {
          return null;
        }
      }
}