import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, SchemaTypes } from 'mongoose';
import { UserRoles } from "src/common/role.enum";
import { TodoItem } from './todo-item.schema';

export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop()
    _id: number

    @Prop({ required: true, unique: true })
    email: string

    @Prop({ required: true })
    passwordHash: string

    @Prop({ required: true })
    fullname: string

    @Prop({ required: true })
    role: UserRoles

    @Prop({ required: true })
    refreshToken: string

    @Prop({ required: true, type: [{ type: SchemaTypes.Number, ref: TodoItem.name }]})
    items: TodoItem[];
}

export const UserSchema = SchemaFactory.createForClass(User);