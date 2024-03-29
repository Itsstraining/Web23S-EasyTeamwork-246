import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './module/users.module';
import { TaskModule } from './module/task.module';
import { ProjectModule } from './module/project.module';
import { TasksGateway } from './gateways/tasks/tasks.gateway';
import { InvitationModule } from './module/invitation.module';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    UsersModule,
    TaskModule, 
    ProjectModule,
    InvitationModule,
    MongooseModule.forRoot('mongodb+srv://easyteamwork:easyteamwork@cluster0.za2rizv.mongodb.net/todotask?retryWrites=true&w=majority'),
    ConfigModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService, TasksGateway],
})
export class AppModule { }
