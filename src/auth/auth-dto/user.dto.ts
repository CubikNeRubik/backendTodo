import { Exclude, Expose } from 'class-transformer';
import { UserRoles } from 'src/common/role.enum';
import { TodoItem } from '../../data/schemas/todo-item.schema';

export interface UserViewModel {
    id: number
    email:string
    fullname:string
    role: UserRoles
}

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

    @Exclude()
    items: TodoItem[]

    @Exclude()
    refreshToken: string

    @Expose()
    role: UserRoles

    constructor(partial: Partial<UserDto>) {
        Object.assign(this, partial);
    }
}