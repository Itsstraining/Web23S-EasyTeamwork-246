import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Invitation } from 'src/schemas/invitation.schema';
import { InvitationService } from 'src/services/invitation/invitation.service';

@Controller('invitation')
export class InvitationController {
    constructor(private invitationService:InvitationService) { }

    @Get('allInvitations')
    async getAllInvitations() {
        return await this.invitationService.getAllInvitations();
    }

    @Get('invitationsById/:id')
    async getInvitationsById(@Param('id') id: string) {
        return await this.invitationService.getInvitationsById(id);
    }

    @Post('createInvitation')
    async createInvitation(@Body() invitation: Invitation) {
        return await this.invitationService.createInvitation(invitation);
    }
}
