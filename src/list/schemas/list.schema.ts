import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

export type ListDocument = List & Document;

@Schema()
export class List{
    @Prop()
    _id:number

    @Prop()
    isComplete:boolean

    @Prop()
    text:string

    @Prop()
    time:number

    @Prop()
    selected:boolean
}

export const ListSchema = SchemaFactory.createForClass(List);