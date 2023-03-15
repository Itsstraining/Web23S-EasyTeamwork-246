import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type NotificationDocument = HydratedDocument<Notification>;
@Schema()
export class Notification {
    @Prop()
    id: string;
    @Prop()
    owner_id: string;
    @Prop()
    receiver_id: string;
    @Prop()
    invitation_id: string;
    @Prop()
    status: number;
    @Prop()
    unread: boolean;
}
export const NotificationSchema = SchemaFactory.createForClass(Notification)