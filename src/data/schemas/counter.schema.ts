import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

export type CounterDocument = Counter & Document;

@Schema()
export class Counter{
    @Prop({ type:String, required: true })
    _id: string

    @Prop({type: Number, default: 0})
    lastId: number

}

export const counterSchema = SchemaFactory.createForClass(Counter);