import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { User, UserDocument } from '../data/schemas/user.schema';
import { UserDto } from './auth-dto/user.dto';
import { SignUpUserDto } from './auth-dto/sign-up.dto';
import { SignInUserDto } from './auth-dto/sign-in.dto';
import { classToPlain, plainToClass } from 'class-transformer';
import { UserRoles } from 'src/common/role.enum';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        private readonly jwtService: JwtService,
    ) {}

    async getUserByEmail(email): Promise<UserDocument> {
        return this.userModel.findOne({ email });
    }

    async signUp(signUpUser: SignUpUserDto): Promise<User> {
        const user = await this.getUserByEmail(signUpUser.email);
        if (user)
            throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
        
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
        const user = await this.getUserByEmail(signIn.email);
        
        const isMatch = await bcrypt.compare(signIn.password, user.passwordHash);

        if (!isMatch) throw new BadRequestException();

        const userDto = new UserDto(user.toObject());
        const payload = classToPlain(userDto, { excludePrefixes: ['_']});

        return {
            accessToken: this.jwtService.sign(payload),
        };
    }
}
