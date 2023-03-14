import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { InvitationController } from 'src/controllers/invitation/invitation.controller';
import { Invitation, InvitationSchema } from 'src/schemas/invitation.schema';
import { InvitationService } from 'src/services/invitation/invitation.service';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Invitation.name, schema: InvitationSchema }]),
    ],
    controllers: [InvitationController],
    providers: [InvitationService],
})
export class InvitationModule {}
