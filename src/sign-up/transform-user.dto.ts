import { Exclude, Expose, Type } from 'class-transformer';

export class userTransform{
    readonly _id:number 

    @Expose()
    get id(): number {
        return this._id;
    };

    @Expose()
    readonly email:string

    @Exclude()
    readonly password:string

    @Expose()
    readonly fullname:string

    // @Type(() => List)
    // list: List[]

    constructor(partial: Partial<userTransform>) {
        Object.assign(this, partial);
    }
}