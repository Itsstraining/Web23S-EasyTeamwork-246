import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './module/users.module';

@Module({
  imports: [
    // //tao file .env 
    //MONGODB_URL=mongodb+srv://<username>:<password>@cluster0.za2rizv.mongodb.net/todotask?retryWrites=true&w=majority
    MongooseModule.forRoot('mongodb+srv://Dts16092003:Dts16092003@cluster0.za2rizv.mongodb.net/todotask?retryWrites=true&w=majority'),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
