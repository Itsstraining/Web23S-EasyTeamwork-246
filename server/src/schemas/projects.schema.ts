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

    @Prop()
    is_in_progress: boolean;
    @Prop()
    is_completed: boolean;
    @Prop()
    is_overdue: boolean;
}
export const ProjectSchema = SchemaFactory.createForClass(Project)