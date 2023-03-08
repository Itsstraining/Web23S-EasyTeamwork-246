import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { Complexity, Status } from "src/models/task.modle";
import { UserModel } from "src/models/users.model";

export type TaskDocument = HydratedDocument<Task>;

@Schema()
export class Task {

    @Prop()
    task_id: string;

    @Prop()
    project_id: string;

    @Prop()
    assignee: UserModel[];

    @Prop()
    name: string;

    @Prop()
    description: string;

    @Prop()
    status: Status;

    @Prop()
    complexity: Complexity;

    @Prop()
    created_at: string;

    @Prop()
    updated_at: string;
}

export const TaskSchema = SchemaFactory.createForClass(Task);