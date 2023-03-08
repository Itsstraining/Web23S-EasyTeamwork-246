import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Status } from 'src/models/projects.model';
import { UserModel } from 'src/models/users.model';

export type ProjectDocument = HydratedDocument<Project>;
@Schema()
export class Project {
    @Prop()
    project_id: string;
    @Prop()
    name: string;
    @Prop()
    owner: string;
    @Prop()
    due_date: Date;
    @Prop()
    status: Status;
    @Prop()
    disable: boolean;
    @Prop()
    members: UserModel[];
}
export const ProjectSchema = SchemaFactory.createForClass(Project)