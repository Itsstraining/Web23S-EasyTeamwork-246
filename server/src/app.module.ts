import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './module/users.module';
import { TaskModule } from './module/task.module';
import { ProjectModule } from './module/project.module';
import { TasksGateway } from './gateways/tasks/tasks.gateway';
import { InvitationModule } from './module/invitation.module';
import { NoticationModule } from './module/notication.module';

@Module({
  imports: [
    TaskModule, 
    MongooseModule.forRoot('mongodb+srv://easyteamwork:easyteamwork@cluster0.za2rizv.mongodb.net/todotask?retryWrites=true&w=majority'),
    UsersModule,
    ProjectModule,
    InvitationModule,
    NoticationModule,
  ],
  controllers: [AppController],
  providers: [AppService, TasksGateway],
})
export class AppModule { }
