import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";


export type TaskDocument = HydratedDocument<Tasks>

@Schema()
export class Tasks{
    @Prop()
    taskID: string;
    
    @Prop()
    title: string;

    @Prop()
    description: string;

    @Prop()
    deadline: string;

    @Prop()
    commentCount: number;
}

export const TasksSchema = SchemaFactory.createForClass(Tasks);