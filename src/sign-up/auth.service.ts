import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt";

import { User, UserDocument } from "./user.schema";
import { userDto } from "./transform-user.dto";
import { SignUpUserDto } from "./auth-dto/sign-up.dto";
import { SignInUserDto } from "./auth-dto/sign-in.dto";


@Injectable()
export class AuthService{

    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        private readonly jwtService: JwtService
        ) {}

   async getUserByEmail(email):Promise<boolean>{
      const userByEmail = this.userModel.exists({email:email})
      console.log(userByEmail)
      return await userByEmail
    }


    async signUp(signUpUser:SignUpUserDto):Promise<User>{
 
     
        // try {
          // if(this.userModel.exists({email:signUpUser.email})){
            const hashedPassword = await bcrypt.hash(signUpUser.password,10);
            const createdUser = new this.userModel({
              ...signUpUser,
              passwordHash: hashedPassword
            });
            // createdUser.password = undefined;
            const responseUser = await createdUser.save();
            const newTransformUser = new userDto(responseUser.toObject())
            return newTransformUser
          // }
        //  } catch (error) {
        //     // throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
        //     throw new HttpException('User already exists', HttpStatus.OK)
        //   }
      }
       
      // }else if(!this.getUserByEmail(signUpUser.email)){
      //   throw new HttpException('User already exists', HttpStatus.OK)
      // }
    



    // async signUp(signUpUser:SignUpUserDto):Promise<User>{
    //   const existUser = this.getUserByEmail(signUpUser.email)
    //   console.log(existUser)
    //   if(this.userModel.exists({email:signUpUser.email})){
    //     const hashedPassword = await bcrypt.hash(signUpUser.password,10);
    //     try {
    //         const createdUser = new this.userModel({
    //           ...signUpUser,
    //           passwordHash: hashedPassword
    //         });
    //         // createdUser.password = undefined;
    //         const responseUser = await createdUser.save();
    //         const newTransformUser = new userDto(responseUser.toObject())
    //         return newTransformUser
    //       } catch (error) {
    //         // throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
    //         throw new HttpException('User already exists', HttpStatus.OK)
    //       }
    //   }
       
    //   // }else if(!this.getUserByEmail(signUpUser.email)){
    //   //   throw new HttpException('User already exists', HttpStatus.OK)
    //   // }
    // }




    async signIn(signIn:SignInUserDto){
      if(this.userModel.exists({email:signIn.email})){
        const user = await this.userModel.findOne({email:signIn.email});
        const isMatch = await bcrypt.compare(signIn.password, user.passwordHash);
        if (isMatch){
          const payload = { email: signIn.email};
          return {
            access_token: this.jwtService.sign(payload),
          }
        }
      }
     
    }


}

