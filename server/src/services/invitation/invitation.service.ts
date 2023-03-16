import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Invitation, InvitationDocument } from 'src/schemas/invitation.schema';

@Injectable()
export class InvitationService {
    constructor(
        @InjectModel(Invitation.name) private invitationModel: Model<InvitationDocument>,
    ) { }

    async getAllInvitations() {
        try {
            return await this.invitationModel.find().exec();
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    async getInvitationsById(id: string) {
        try {
            return await this.invitationModel.find({ to: id });
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    async createInvitation(invitation: Invitation) {
        try {
            let createInvitation = new this.invitationModel(invitation);
            return await createInvitation.save();
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    async deleteInvitation(id: string) {
        try {
            this.invitationModel.deleteOne({ invi_id: id }).exec();
        } catch (e) {
            console.log(e);
            return null;
        }
    }
}
