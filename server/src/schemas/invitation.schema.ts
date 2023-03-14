import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type InvitationDocument = HydratedDocument<Invitation>;
@Schema()
export class Invitation {
    @Prop()
    id: string;
    @Prop()
    owner_id: string;
    @Prop()
    receiver_id: string;
    @Prop()
    status: number;
    @Prop()
    project_id: string;
    @Prop()
    unread: boolean;
}
export const InvitationSchema = SchemaFactory.createForClass(Invitation)