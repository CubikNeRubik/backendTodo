import { Body, ClassSerializerInterceptor, Controller, HttpException, HttpStatus, Post, SerializeOptions, UseInterceptors } from "@nestjs/common";

import { AuthService } from "./auth.service";
import { SignInUserDto } from "./auth-dto/sign-in.dto";
import { SignUpUserDto } from "./auth-dto/sign-up.dto";
import { User } from "../data/schemas/user.schema";
import { RefreshDto } from "./auth-dto/refresh.dto";

@UseInterceptors(ClassSerializerInterceptor)
@SerializeOptions({
    excludePrefixes: ['_'],
})
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('sign-up')
    async signUp(@Body() signUpUser: SignUpUserDto): Promise<User> {
        return this.authService.signUp(signUpUser)
    }

    @Post('sign-in')
    async signIn(@Body() signInUser: SignInUserDto) {
        return this.authService.signIn(signInUser)
    }


    @Post('refresh')
    async refresh(@Body() refreshDto: RefreshDto) {
        try {
            const { refreshToken } = refreshDto;

            if (!refreshToken) {
                throw new HttpException('Refresh token not found', HttpStatus.BAD_REQUEST);
            }

            return this.authService.refreshTokens(refreshToken);
        } catch (e) {
            throw new HttpException('Invalid refresh token', HttpStatus.BAD_REQUEST);
        }


    }
}
