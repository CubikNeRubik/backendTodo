import { Body, ClassSerializerInterceptor, Controller, HttpException, HttpStatus, Post, SerializeOptions, UseInterceptors } from "@nestjs/common";

import { AuthService } from "./auth.service";
import { SignInUserDto } from "./auth-dto/sign-in.dto";
import { SignUpUserDto } from "./auth-dto/sign-up.dto";
import { User } from "./user.schema";

@UseInterceptors(ClassSerializerInterceptor)
@SerializeOptions({
    excludePrefixes: ['_'],
})

@Controller('auth')
export class AuthController{

    constructor(private readonly authService:AuthService){}

    @Post(':sign-up')
    async signUp(@Body() signUpUser:SignUpUserDto):Promise<User>{
        // const existUser = await this.authService.getUserByEmail(signUpUser.email)
        // if(existUser == false){
            return await this.authService.signUp(signUpUser) 
        // }else{
        //     throw new HttpException('User already exists', HttpStatus.OK)
        // }
                   
    }

    @Post(':sign-in')
    async signIn(@Body() signInUser:SignInUserDto){
        const existUser = await this.authService.getUserByEmail(signInUser.email)
        if(existUser == true){
            return this.authService.signIn(signInUser)
        }else{
            throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
        }
        // this.authService.getUserByEmail(signInUser.email)
       
    }

}