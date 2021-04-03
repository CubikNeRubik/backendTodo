import { IsEmail, MinLength } from "class-validator"
import { UserRoles } from "../../common/role.enum"

export class SignUpUserDto{
    @IsEmail()
    readonly email: string

    @MinLength(8)
    readonly password: string

    readonly fullname: string
}