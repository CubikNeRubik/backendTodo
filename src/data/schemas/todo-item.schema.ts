import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

export type TodoItemDocument = TodoItem & Document;

@Schema()
export class TodoItem{
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

export const TodoSchema = SchemaFactory.createForClass(TodoItem);