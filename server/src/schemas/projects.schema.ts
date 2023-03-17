import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { UserModel } from 'src/models/users.model';

export type ProjectDocument = HydratedDocument<Project>;

export type Status = "in-progress" | "completed" | "overdue";
@Schema()
export class Project {
    @Prop()
    project_id: string;
    @Prop()
    marked: boolean;
    @Prop()
    name: string;
    @Prop()
    owner: string;
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
    @Prop()
    members: UserModel[];
}
export const ProjectSchema = SchemaFactory.createForClass(Project)