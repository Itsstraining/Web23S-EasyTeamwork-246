import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Status } from 'src/models/projects.model';
import { UserDocument } from './users.schema';
import { IsNotEmpty } from 'class-validator';

export type ProjectDocument = HydratedDocument<Project>;
@Schema({ timestamps: true })
export class Project {
    @Prop()
    project_id: string;
    @Prop()
    marked: boolean;
    @Prop()
    name: string;
    @Prop()
    owner_name: string;
    @Prop()
    owner_photo: string;
    @Prop()
    owner_id: string;
    @Prop()
    due_date: string;
    @Prop()
    status: Status;
    @Prop()
    disable: boolean;
    // @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }] })
    @Prop()
    members: UserDocument[];
    @IsNotEmpty()
    @Prop()
    owner: string;
    // @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }] })
    @Prop()
    invitedMembers: UserDocument[];
}
export const ProjectSchema = SchemaFactory.createForClass(Project)