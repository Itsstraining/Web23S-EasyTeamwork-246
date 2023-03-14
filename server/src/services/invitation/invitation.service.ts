import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Invitation, InvitationDocument } from 'src/schemas/invitation.schema';
import { ProjectsService } from '../projects/projects.service';

@Injectable()
export class InvitationService {
    constructor(
        @InjectModel(Invitation.name) private invitationModel: Model<InvitationDocument>,
        private projectService: ProjectsService,
    ) { }

    async getAllInvitations() {
        return await this.invitationModel.find().exec();
    }

    async getInvitationsById(id: string) {
        return await this.invitationModel.find({ to: id });
    }

    async createInvitation(invitation: Invitation) {
        let createInvitation = new this.invitationModel(invitation);
        console.log(createInvitation);
        return await createInvitation.save();
    }
}
