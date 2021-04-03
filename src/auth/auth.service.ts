import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { classToPlain } from 'class-transformer';

import { User, UserDocument } from '../data/schemas/user.schema';
import { UserDto, UserViewModel } from './auth-dto/user.dto';
import { SignUpUserDto } from './auth-dto/sign-up.dto';
import { SignInUserDto } from './auth-dto/sign-in.dto';

import { UserRoles } from '../common/role.enum';
import { AccessTokenSignConfig, RefreshTokenSignConfig, RefreshTokenVerifyConfig } from '../common/constants';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        private readonly jwtService: JwtService,
    ) {}

    async signUp(signUpUser: SignUpUserDto): Promise<UserDto> {
        const user = await this.getUserByEmail(signUpUser.email);

        if (user) throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
        
        const hashedPassword = await bcrypt.hash(
            signUpUser.password,
            10,
        );

        const createdUser = new this.userModel({
            ...signUpUser,
            passwordHash: hashedPassword,
            role: UserRoles.USER,
        });
        
        const responseUser = await createdUser.save();
        return new UserDto(responseUser.toObject());
    }

    async signIn(signIn: SignInUserDto) {
        try {
            const user = await this.getUserByEmail(signIn.email);
        
            const isMatch = await bcrypt.compare(signIn.password, user.passwordHash);
    
            if (!isMatch) throw new BadRequestException();
    
            const userDto = new UserDto(user.toObject());
            const payload = classToPlain(userDto, { excludePrefixes: ['_']}) as UserViewModel;
    
            return this.generateTokens(payload);
        } catch (ex){
            throw new BadRequestException();
        }
    }

    async refreshTokens(refreshToken: string){
        const { id: userId } = await this.jwtService.verifyAsync( refreshToken, RefreshTokenVerifyConfig);
        const dbUser = await this.userModel.findById(userId);
        
        if(dbUser.refreshToken !== refreshToken) throw new BadRequestException();

        const userDto = new UserDto(dbUser.toObject());
        const user = classToPlain(userDto, { excludePrefixes: ['_']}) as UserViewModel;
        return this.generateTokens(user)
    }

    async getUserByEmail(email: string): Promise<UserDocument> {
        return this.userModel.findOne({ email });
    }

    private async generateAccessToken(user: UserViewModel): Promise<string>{
        return this.jwtService.signAsync(user, AccessTokenSignConfig);
    }

    private async generateRefreshToken(user: UserViewModel): Promise<string>{
        return this.jwtService.signAsync(user, RefreshTokenSignConfig);
    }

    private async generateTokens(user: UserViewModel): Promise<{accessToken: string, refreshToken: string}>{
        const [
            accessToken,
            refreshToken,
        ] = await Promise.all([
            this.generateAccessToken(user),
            this.generateRefreshToken(user),
        ])

        await this.userModel.findByIdAndUpdate(user.id, { refreshToken });
        return {
            accessToken,
            refreshToken,
        }  
    }
}
