import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type InvitationDocument = HydratedDocument<Invitation>;
@Schema()
export class Invitation {
    @Prop()
    id: string;
    @Prop()
    from: string;
    @Prop()
    to: string;
    @Prop()
    name: string;
    @Prop()
    status: string;
    @Prop()
    project_id: string;
    @Prop()
    project_name: string;
    @Prop()
    unread: boolean;
}
export const InvitationSchema = SchemaFactory.createForClass(Invitation)