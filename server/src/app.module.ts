import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './module/users.module';
import { TaskService } from './services/task/task.service';
import { TaskController } from './controllers/task/task.controller';
import { TaskModule } from './module/task.module';
import { Task, TaskSchema } from './schemas/task.schema';
// import { MailerModule } from '@nestjs-modules/mailer';
import { ProjectsController } from './controllers/projects/projects.controller';
import { ProjectsService } from './services/projects/projects.service';
import { ProjectModule } from './module/project.module';

@Module({
  imports: [
    TaskModule, 
    MongooseModule.forRoot('mongodb+srv://easyteamwork:easyteamwork@cluster0.za2rizv.mongodb.net/todotask?retryWrites=true&w=majority'),
    UsersModule,
    ProjectModule
    // MailerModule.forRoot({
    //   transport: {
    //     host:'',
    //     auth:{
    //       user:'',
    //       pass:'',
    //     }
    //   }

    // })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
