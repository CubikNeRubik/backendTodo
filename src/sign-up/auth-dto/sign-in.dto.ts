import { IsEmail, MinLength } from "class-validator"

export class SignInUserDto{
    @IsEmail()
    readonly email:string

    @MinLength(8)
    readonly password:string
}