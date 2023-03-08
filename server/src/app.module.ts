import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './module/users.module';
import { TaskService } from './services/task/task.service';
import { TaskController } from './controllers/task/task.controller';
import { TaskModule } from './module/task.module';

@Module({
  imports: [
    TaskModule, 
    MongooseModule.forRoot("mongodb+srv://admin:root@todo.toy49dn.mongodb.net/todo_list?retryWrites=true&w=majority")
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
