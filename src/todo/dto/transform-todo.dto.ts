import { Expose } from 'class-transformer';

export class TodoDto{
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

    constructor(partial: Partial<TodoDto>) {
        Object.assign(this, partial);
    }
}

