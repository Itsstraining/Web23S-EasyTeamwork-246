import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { InvitationModel } from 'src/models/invitation.model';
import { Invitation, InvitationDocument } from 'src/schemas/invitation.schema';
import { ProjectsService } from '../projects/projects.service';

@Injectable()
export class InvitationService {
    constructor(
        @InjectModel(Invitation.name) private invitationModel: Model<InvitationDocument>,
        private projectService: ProjectsService
    ) { }

    async getAllInvitations() {
        try {
            return await this.invitationModel.find().exec();
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    async getInvitationsById(id: string): Promise<Invitation[]> {
        try {
            let result = await this.invitationModel.find({ to: id });
            return result as Invitation[];
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    async createInvitation(invitation: Invitation, idReceiver: string) {
        try {
            let project = await this.projectService.getById(invitation.project_id);
            let index = project[0].members.findIndex(member => member == idReceiver);
            if (index == -1) {
                let createdInvitation = new this.invitationModel(invitation);
                console.log(createdInvitation);
                return await createdInvitation.save();
            } else {
                return;
            }
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    async acceptInvitation(idProject: string, idReceiver: string, idInvitation: string, invitation: InvitationModel) {
        let project = await this.projectService.getById(idProject);
        project[0].members.push(idReceiver);
        await this.projectService.update(project[0], idProject);
        await this.invitationModel.findOneAndUpdate({id: idInvitation}, {status: 'accepted'}, {new: true});
    }

    async declineInvitation(idInvitation: string) {
        return await this.invitationModel.findOneAndUpdate({id: idInvitation}, {status: 'rejected'});
    }
}
