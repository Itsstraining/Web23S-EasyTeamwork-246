import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;
@Schema({ timestamps: true })
export class User {
    @Prop()
    uid: string;
    @Prop()
    displayName: string;
    @Prop()
    email: string;
    @Prop()
    photoURL: string;
}
export const UserSchema = SchemaFactory.createForClass(User)