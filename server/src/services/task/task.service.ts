import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TaskModel } from 'src/models/task.modle';
import { Task, TaskDocument } from 'src/schemas/task.schema';

@Injectable()
export class TaskService {

    constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>){}

    async getAll(): Promise<Task[]> {
        try{
            let data = await this.taskModel.find({}).exec();
            return data;
        }catch(e){
            console.log(e);
            return null;
        }
    }

    async getById(id: string) {
        try{
            let data = await this.taskModel.find({task_id: id}).exec();
            return data;
        }catch(e){
            console.log(e);
            return null;
        }
    }

    async getByPrjId(id: string) {
        try{
            let data = await this.taskModel.find({project_id: id}).exec();
            return data;
        }catch(e){
            console.log(e);
            return null;
        }
    }

    async create(newTask: TaskModel) {
        try{
            let data = await this.taskModel.create(newTask);
            return data;
        }catch(e){
            console.log(e);
            return null;
        }
    }

    async update(task: TaskModel, id: string) {
        try{
            let data = await this.taskModel.updateOne({task_id: id}, {$set: {
                name: task.name,
                description: task.description,
                status: task.status,
                complexity: task.complexity,
            }});
            return data;
        }catch(e){
            console.log("error: " + e);
            return null;
        }
    }

    async delete(id: string) {
        try{
            let data = this.taskModel.deleteOne({task_id: id}).exec();
            return data;
        }catch(e){
            console.log(e);
            return null;
        }
    }

}
