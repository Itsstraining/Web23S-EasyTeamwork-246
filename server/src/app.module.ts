import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './module/users.module';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://easyteamwork:easyteamwork@cluster0.za2rizv.mongodb.net/todotask?retryWrites=true&w=majority'),
    UsersModule,
    MailerModule.forRoot({
      transport: {
        host:'',
        auth:{
          user:'',
          pass:'',
        }
      }

    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
