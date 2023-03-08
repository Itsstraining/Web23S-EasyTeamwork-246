import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type TaskDocument = HydratedDocument<Task>;

@Schema()
export class Task {

    @Prop()
    task_id: string;

    @Prop()
    project_id: string;

    @Prop()
    assignee: string;

    @Prop()
    name: string;

    @Prop()
    description: string;

    @Prop()
    status: "todo" | "in-progress" | "done";

    @Prop()
    complexity: "easy" | "medium" | "hard";

    @Prop()
    created_at: string;

    @Prop()
    updated_at: string;
}

export const TaskSchema = SchemaFactory.createForClass(Task);