import { Exclude, Expose, Type } from 'class-transformer';

export class UserDto{
    readonly _id:number 

    @Expose()
    get id(): number {
        return this._id;
    };

    @Expose()
    readonly email:string

    @Exclude()
    readonly passwordHash:string

    @Expose()
    readonly fullname:string

    // @Type(() => List)
    // list: List[]

    constructor(partial: Partial<UserDto>) {
        Object.assign(this, partial);
    }
}