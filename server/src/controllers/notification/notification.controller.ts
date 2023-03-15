import { Controller,Get, Post, Body, Param } from '@nestjs/common';
import { NotificationModel } from 'src/models/notification.model';
import { NotificationService } from 'src/services/notification/notification.service';

@Controller('notifications')
export class NotificationController {
    constructor(private notificationService:NotificationService) { }

    @Get('allNotification')
    async getAllNotification() {
        return await this.notificationService.getAllNotification();
    }

    @Get('notificationById/:id')
    async getInvitationsById(@Param('id') id: string) {
        return await this.notificationService.getNotificationById(id);
    }

    @Post('createNotification')
    async createInvitation(@Body() notificaton: NotificationModel) {
        return await this.notificationService.createNotification(notificaton);
    }
}
