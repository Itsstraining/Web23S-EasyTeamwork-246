import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskController } from 'src/controllers/task/task.controller';
import { Task, TaskSchema } from 'src/schemas/task.schema';
import { TaskService } from 'src/services/task/task.service';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]),
    ],
    controllers: [TaskController],
    providers: [TaskService],
})
export class TaskModule {}
