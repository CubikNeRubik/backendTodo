import { Exclude, Expose, Type } from 'class-transformer';
import { List } from '../schemas/list.schema';
import { CreateTodoDto } from './create-todo.dto';
export class TodoItem{
    readonly _id:number 

    @Expose()
    get id(): number {
        return this._id;
    };

    @Expose()
    readonly isComplete:boolean

    @Expose()
    readonly text:string

    @Expose()
    readonly time:number

    @Expose()
    readonly selected:boolean 

    // @Type(() => List)
    // list: List[]

    constructor(partial: Partial<TodoItem>) {
        Object.assign(this, partial);
    }
}

