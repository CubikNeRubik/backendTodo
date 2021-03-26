import { Body, ClassSerializerInterceptor, Controller, Post, SerializeOptions, UseInterceptors } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignUpUserDto } from "./sign-up.dto";
import { User } from "./user.schema";

@UseInterceptors(ClassSerializerInterceptor)
@SerializeOptions({
    excludePrefixes: ['_'],
})

@Controller('auth')
export class AuthController{

    constructor(private readonly authService:AuthService){}

    @Post(':sign-up')
    signUp(@Body() signUpUser:SignUpUserDto):Promise<User>{
        return this.authService.signUp(signUpUser)
    }

    @Post(':sign-in')
    signIn(){}

}