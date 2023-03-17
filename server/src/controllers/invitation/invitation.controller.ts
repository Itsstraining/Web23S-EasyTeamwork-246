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
    async getInvitationsById(@Param('id') idReceiver: string) {
        return await this.invitationService.getInvitationsById(idReceiver);
    }

    @Post('createInvitations/:id')
    async createInvitation(@Body() invitation: Invitation, @Param('id') idReceiver: string) {
        return await this.invitationService.createInvitation(invitation, idReceiver);
    }

    @Put('accept/:idProject/:idReceiver/:idInvitation')
    acceptInvitation(@Param('idProject') idProject: string, @Param('idReceiver') idReceiver: string, @Param('idInvitation') idInvitation: string, @Body() invitation: Invitation) {
       return this.invitationService.acceptInvitation(idProject, idReceiver, idInvitation, invitation);
    }

    @Put('decline/:idInvitation')
    declineInvitation(@Param('idInvitation') idInvitation: string) {
        return this.invitationService.declineInvitation(idInvitation);
    }
}
