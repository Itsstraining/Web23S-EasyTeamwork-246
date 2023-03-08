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

    async getById(id: string): Promise<TaskModel | null> {
        try{
            let data = await this.taskModel.findById({id: id}).exec();
            return data;
        }catch(e){
            console.log(e);
            return null;
        }
    }

}
