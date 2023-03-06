import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './module/users.module';

@Module({
  imports: [
    // //tao file .env 
    //MONGODB_URL=mongodb+srv://user:password@cluster0.fidun.mongodb.net/Hotel?retryWrites=true&w=majority
    MongooseModule.forRoot(process.env.MONGODB_URL),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
