import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { InvitationController } from 'src/controllers/invitation/invitation.controller';
import { Invitation, InvitationSchema } from 'src/schemas/invitation.schema';
import { User, UserSchema } from 'src/schemas/users.schema';
import { InvitationService } from 'src/services/invitation/invitation.service';
import { ProjectsService } from 'src/services/projects/projects.service';
import { ProjectModule } from './project.module';
import { UsersModule } from './users.module';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Invitation.name, schema: InvitationSchema }]),
        forwardRef(() => ProjectModule),
    ],
    controllers: [InvitationController],
    providers: [InvitationService],
})
export class InvitationModule {}
