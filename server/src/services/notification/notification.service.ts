import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Notification, NotificationDocument } from 'src/schemas/notification.schema';
import { InvitationService } from '../invitation/invitation.service';
import { ProjectsService } from '../projects/projects.service';

@Injectable()
export class NotificationService {
    constructor(
        @InjectModel(Notification.name) private notificationModel: Model<NotificationDocument>,
    ) { }

    async getAllNotification() {
        return await this.notificationModel.find().exec();
    }

    async getNotificationById(id: string) {
        return await this.notificationModel.find({ to: id });
    }

    async createNotification(invitation: Notification) {
        let createNotification = new this.notificationModel(invitation);
        console.log(createNotification);
        return await createNotification.save();
    }
}
