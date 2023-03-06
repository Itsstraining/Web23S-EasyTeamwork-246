import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose/dist';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskController } from './tasks/controller/task/task.controller';
import { TaskService } from './tasks/services/task/task.service';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [TasksModule,],
  controllers: [AppController, TaskController],
  providers: [AppService, TaskService],
})
export class AppModule {}
