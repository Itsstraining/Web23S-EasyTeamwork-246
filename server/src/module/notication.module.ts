import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NotificationController } from 'src/controllers/notification/notification.controller';
import { Notification, NotificationSchema } from 'src/schemas/notification.schema';
import { NotificationService } from 'src/services/notification/notification.service';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Notification.name, schema: NotificationSchema }]),
    ],
    controllers: [NotificationController],
    providers: [NotificationService],
})
export class NoticationModule {}
