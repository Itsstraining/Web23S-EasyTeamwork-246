import { Body, Controller, Get, Param, Post, Put, Delete } from '@nestjs/common';
import { Invitation } from 'src/schemas/invitation.schema';
import { InvitationService } from 'src/services/invitation/invitation.service';

@Controller('invitations')
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

    @Post('createInvitations')
    async createInvitation(@Body() invitation: Invitation) {
        return await this.invitationService.createInvitation(invitation);
    }

    @Delete('deleteInvitations/:id')
    async deleteInvitation(@Param('id') id: string) {
        return await this.invitationService.deleteInvitation(id);
    }
}
